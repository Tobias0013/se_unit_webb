import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import HomePage from "./page/home";
import MainPage from "./page/Mainpage/MainPage";

import LoginPage from "./page/auth/login";
import RegisterPage from "./page/auth/register";
import DevicesPage from "./page/devices/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogOut from "./page/auth/logOut"; 

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./component/header/header";

const rootElem = document.getElementById("root");
if (!rootElem) {
  throw new Error("Root element not found");
}

const root = ReactDOM.createRoot(rootElem);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/devices" element={<DevicesPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/logout" element={<LogOut />} />
        {/* FIXED: Redirect unknown routes to Devices */}
        <Route path="*" element={<Navigate to="/devices" replace={true} />} />
      </Routes>
    
    </BrowserRouter>
    <ToastContainer position="top-right" autoClose={5000} />
  </React.StrictMode>
);


