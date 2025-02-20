import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const rootElem = document.getElementById("root");

if (!rootElem) {
  process.exit(1);
}

const root = ReactDOM.createRoot(rootElem);

root.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/tmp" replace={true} />} />
        <Route path="/tmp" element={<button onClick={() => alert("Hello, react template :D")}>Click me</button>} />
      </Routes>
    </BrowserRouter>
  </>
);

