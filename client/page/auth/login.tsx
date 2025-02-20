import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./auth.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage("Please fill in all fields");
    }
    console.log("Username: ", username);
    console.log("Password: ", password);
  };

  return (
    <section className="auth-section">
      <div className="auth-container">
        <form className="auth-form" onSubmit={onFormSubmit}>
          <h1 className="auth-h1">Log in</h1>
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
          <p className="error-message">{errorMessage}</p>
          <div className="auth-btn-container">
            <button
              className="auth-btn alt"
              type="button"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </button>
            <button className="auth-btn">Log in</button>
          </div>
        </form>
      </div>
    </section>
  );
}
