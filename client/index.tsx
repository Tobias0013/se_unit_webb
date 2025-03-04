import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./style.css";
import LoginPage from "./page/auth/login";
import RegisterPage from "./page/auth/register";
import Header from "./component/header/header";
import LogOut from "./page/auth/logOut";

const rootElem = document.getElementById("root");

if (!rootElem) {
  process.exit(1);
}

const root = ReactDOM.createRoot(rootElem);

root.render(
  <>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route index element={<Navigate to="/tmp" replace={true} />} />
        <Route path="/tmp" element={<button onClick={() => alert("Hello, react template :D")}>Click me</button>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/logout" element={<LogOut/>} />
        <Route path="*" element={<Navigate to="/tmp" replace={true} />} />
      </Routes>
    </BrowserRouter>
  </>
);

