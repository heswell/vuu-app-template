import React from "react";
import { createRoot } from "react-dom/client";
import { getAuthDetailsFromCookies, redirectToLogin } from "@vuu-ui/vuu-shell";
import { App } from "./App";

import "./index.css";

import "@vuu-ui/vuu-theme/index.css";
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/300-italic.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/400-italic.css";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/500-italic.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/600-italic.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/700-italic.css";
import "@fontsource/open-sans/800.css";
import "@fontsource/open-sans/800-italic.css";

const [username, token] = getAuthDetailsFromCookies();
// if (!username || !token) {
//   // This won't be needed with serverside protection
//   redirectToLogin();
// } else {
const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
// }
