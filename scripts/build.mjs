import {
  assertFileExists,
  byFileName,
  copyFolderSync,
  formatBytes,
  formatDuration,
  getCommandLineArg,
  padRight,
  readJson,
  readPackageJson,
  writeMetaFile,
} from "./utils.mjs";
import { build } from "./esbuild.mjs";
import fs from "fs";
import path from "path";

const entryPoints = ["index.tsx"];

const outdir = "./deployed_apps/vuu-app-template";
let configFile = "./config/localhost.config.json";

const websocketUrl = getCommandLineArg("--url", true);
console.log(`websocket URL ${websocketUrl} type ${typeof websocketUrl}`);
const watch = getCommandLineArg("--watch");
const development = watch || getCommandLineArg("--dev");
const configPath = getCommandLineArg("--config", true);
if (configPath) {
  configFile = configPath;
}

assertFileExists(configFile, true);

const { name: projectName } = readPackageJson();

const esbuildConfig = {
  entryPoints,
  env: development ? "development" : "production",
  name: "vuu-app-template",
  outdir,
  splitting: true,
  target: "esnext",
};

async function main() {
  function createDeployFolder() {
    fs.rmSync(outdir, { recursive: true, force: true });
    fs.mkdirSync(outdir, { recursive: true });
  }

  console.log("[CLEAN]");
  createDeployFolder();

  console.log("[BUILD]");
  const [
    {
      result: { metafile },
      duration,
    },
  ] = await Promise.all([build(esbuildConfig)]).catch((e) => {
    console.error(e);
    process.exit(1);
  });

  await writeMetaFile(metafile, outdir);

  console.log("[DEPLOY public assets]");
  const publicContent = fs.readdirSync(`./public`);
  publicContent.forEach((file) => {
    if (file !== ".DS_Store") {
      if (typeof fs.cp === "function") {
        // node v16.7 +
        fs.cp(
          path.resolve("public", file),
          path.resolve(outdir, file),
          { recursive: true },
          (err) => {
            if (err) throw err;
          }
        );
      } else {
        // delete once we no longer need to support node16 < .7
        copyFolderSync(
          path.resolve("public", file),
          path.resolve(outdir, file)
        );
      }
    }
  });
  console.log("[DEPLOY config file]");
  const configFile = "localhost.config.json";
  fs.cp(
    path.resolve("config", configFile),
    path.resolve(outdir, configFile),
    (err) => {
      if (err) throw err;
    }
  );

  const outputs = {
    core: [],
    common: [],
    features: [],
  };
  for (const [file, { bytes }] of Object.entries(metafile.outputs)) {
    if (file.endsWith("js") || file.endsWith("css")) {
      const fileName = file.replace(`${outdir}/`, "");
      if (fileName.startsWith(projectName)) {
        outputs.core.push({ fileName, bytes });
      } else {
        outputs.common.push({ fileName, bytes });
      }
    }
  }

  console.log("\ncore");
  outputs.core.sort(byFileName).forEach(({ fileName, bytes }) => {
    console.log(`${padRight(fileName, 30)} ${formatBytes(bytes)}`);
  });
  console.log("\ncommon");
  outputs.common.forEach(({ fileName, bytes }) => {
    console.log(`${padRight(fileName, 30)} ${formatBytes(bytes)}`);
  });

  console.log(`\nbuild took ${formatDuration(duration)}`);
}

main();
