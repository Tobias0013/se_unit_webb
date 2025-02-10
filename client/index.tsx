import React from "react";
import ReactDOM from "react-dom/client";

import Clock from "./component/clock";
import Form from "./component/form";
import ColorPicker from "./component/colorPicker";

const rootElem = document.getElementById("root");

if (!rootElem) {
  process.exit(1);
}

const root = ReactDOM.createRoot(rootElem);

root.render(
  <>
    <Clock />
    <Form />
    <ColorPicker />
  </>
);

