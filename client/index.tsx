import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

const rootElem = document.getElementById("root");

if (!rootElem) {
  process.exit(1);
}

const root = ReactDOM.createRoot(rootElem);

root.render(
  <>
    <button onClick={() => alert("Hello, react template :D")}>Click me</button>
  </>
);
