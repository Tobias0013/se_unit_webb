/* Author(s): Tobias Vinblad */

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./style.css";
import HomePage from "./page/home";
import LoginPage from "./page/auth/login";
import RegisterPage from "./page/auth/register";
import DevicesPage from "./page/devices/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./component/header/header";
import LogOut from "./page/auth/logOut";
import AddPage from "./page/addPage/addPage";
import NotFoundPage from "./page/404/404";
import Error500 from "./page/500/500";
import SchedulePage from "./page/schedule/schedule";

const rootElem = document.getElementById("root");
if (!rootElem) {
  throw new Error("Root element not found");
}

const root = ReactDOM.createRoot(rootElem);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/devices" element={<DevicesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/addDevice" element={<AddPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/500" element={<Error500 />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={5000} />
    </QueryClientProvider>
  </React.StrictMode>
);
