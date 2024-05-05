import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { serviceWorker } from "server/browser";

import App from "./App";
serviceWorker.start({ onUnhandledRequest: "bypass" });

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
