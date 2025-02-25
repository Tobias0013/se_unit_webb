import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./auth.css";
import { register } from "../../controller/API/auth";
import { handleAPIError } from "../../controller/API/connection";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    try {
      await register(username, password, isAdmin);
    } catch (error) {
      const message = handleAPIError(error, "Register page");
      setErrorMessage(message);
    }
    navigate("/login");
  };

  return (
    <section className="auth-section">
      <div className="auth-container">
        <form className="auth-form" onSubmit={onFormSubmit}>
          <h1 className="auth-h1">Register</h1>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="auth-checkbox-container">
            <div
              className="auth-checkbox"
              onClick={(e) => setIsAdmin(!isAdmin)}
            >
              <input type="checkbox" checked={isAdmin} readOnly />
              <label htmlFor="isAdmin">Register as Admin</label>
            </div>
          </div>
          <p className="error-message">{errorMessage}</p>
          <div className="auth-btn-container">
            <button
              className="auth-btn alt"
              type="button"
              onClick={() => {
                navigate("/login");
              }}
            >
              Log in
            </button>
            <button className="auth-btn">Register</button>
          </div>
        </form>
      </div>
    </section>
  );
}
