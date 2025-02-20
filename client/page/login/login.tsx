import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./login.css";

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
    <section className="login-section">
      <div className="login-container">
        <form onSubmit={onFormSubmit}>
          <h1 className="login-h1">Log in</h1>
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
          <div className="login-btn-container">
            <button className="login-btn">Log in</button>
            <button
              className="login-btn"
              onClick={(e) => navigate("/register")}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
