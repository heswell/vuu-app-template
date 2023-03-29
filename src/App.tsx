import { Shell } from "@vuu-ui/vuu-shell";
import "./blotter";

import "@vuu-ui/vuu-shell/index.css";
import "@vuu-ui/vuu-layout/index.css";
import "./App.css";
import { HTMLAttributes, useMemo } from "react";

const classBase = "vuuApp";

const user = { username: "Sid", token: "tkn-001" };
const serverUrl = `wss://${location.hostname}:8090/websocket`;

export type AppProps = HTMLAttributes<HTMLDivElement>;

export const App = (props: AppProps) => {
  const defaultLayout = useMemo(() => {
    return {
      type: "Stack",
      props: {
        className: classBase,
        style: {
          width: "100%",
          height: "100%",
        },
        enableAddTab: true,
        preserve: true,
        active: 0,
      },
      children: [
        {
          type: "View",
          props: {
            style: { flex: "1 1 auto" },
          },
          children: [
            {
              type: "Blotter",
              title: "Page 1",
              style: { height: "calc(100% - 6px)" },
            },
          ],
        },
      ],
    };
  }, []);

  return (
    <Shell
      {...props}
      serverUrl={serverUrl}
      user={user}
      defaultLayout={defaultLayout}
    ></Shell>
  );
};
