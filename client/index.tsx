import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import MainPage from "./page/MainPage";

const rootElem = document.getElementById("root");

if (!rootElem) {
  process.exit(1);
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<MainPage />)
;
