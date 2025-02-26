import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./style.css";
<<<<<<< HEAD
import MainPage from "./page/MainPage";
=======
import LoginPage from "./page/auth/login";
import RegisterPage from "./page/auth/register";
>>>>>>> d7300791bc72a605707506e41601269e726e790e

const rootElem = document.getElementById("root");

if (!rootElem) {
  process.exit(1);
}

<<<<<<< HEAD
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<MainPage />)
;
=======
const root = ReactDOM.createRoot(rootElem);

root.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/tmp" replace={true} />} />
        <Route path="/tmp" element={<button onClick={() => alert("Hello, react template :D")}>Click me</button>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="*" element={<Navigate to="/tmp" replace={true} />} />
      </Routes>
    </BrowserRouter>
  </>
);

>>>>>>> d7300791bc72a605707506e41601269e726e790e
