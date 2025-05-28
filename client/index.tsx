/* Author(s): Tobias Vinblad */
/*            Securella updated notifications & settings feature */

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./style.css";

import HomePage from "./page/home";
import LoginPage from "./page/auth/login";
import RegisterPage from "./page/auth/register";
import DevicesPage from "./page/devices/index";
import SchedulePage from "./page/schedule/schedule";
import SettingsPage from "./page/settings/SettingsPage";      // new Settings page
import NotFoundPage from "./page/404/404";
import Error500 from "./page/500/500";
import LogOut from "./page/auth/logOut";
import AddPage from "./page/addPage/addPage";

import Header from "./component/header/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// notification imports
import { NotificationProvider } from "./component/notifications/NotificationContext";
import { NotificationBell } from "./component/notifications/NotificationBell";

// user settings context
import { UserProvider } from "./component/user/UserContext";

const rootElem = document.getElementById("root");
if (!rootElem) throw new Error("Root element not found");

const root = ReactDOM.createRoot(rootElem);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>                {/* Wrap in UserContext */}
        <NotificationProvider>      {/* Then providing notifications */}
          <BrowserRouter>
            {/* 
              Render Header once here. 
              NotificationBell renders its own dropdown on click.
            */}
            <Header />
            <NotificationBell />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/devices" element={<DevicesPage />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/settings" element={<SettingsPage />} />  {/* Settings route */}
              <Route path="/addDevice" element={<AddPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/logout" element={<LogOut />} />
              <Route path="/500" element={<Error500 />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
          <ToastContainer position="top-right" autoClose={5000} />
        </NotificationProvider>
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
