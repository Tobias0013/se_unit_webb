import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./style.css";
import HomePage from "./page/home"; // WILL WE HAVE HOME PAGE OR..?
import LoginPage from "./page/auth/login";
import RegisterPage from "./page/auth/register";
import DevicesPage from "./page/devices/index"; // Oona's, don't touch
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./component/header/header";
import LogOut from "./page/auth/logOut";

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
        {/* Devices = Oona's page, don't modify */}
        <Route path="/devices" element={<DevicesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/logout" element={<LogOut/>} />
        {/* Redirect any unknown routes to ...? */}
        <Route path="*" element={<Navigate to="/tmp" replace={true} />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer position="top-right" autoClose={5000} />
  </React.StrictMode>
);


