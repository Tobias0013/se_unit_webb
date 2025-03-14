import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./auth.css";
import { login } from "../../controller/API/auth";
import { handleAPIError } from "../../controller/API/connection";
import { setToken } from "../../controller/jwtToken";


/**
 * LoginPage component renders a login form for user authentication.
 * 
 * This component handles the following:
 * - Manages state for username, password, and error messages.
 * - Handles form submission and validates input fields.
 * - Calls the login function to authenticate the user.
 * - Navigates to the dashboard upon successful login.
 * - Displays error messages for invalid input or failed login attempts.
 * 
 * @returns {JSX.Element} The rendered login page component.
 */
export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    try {
      const resp = await login(username, password);
      setToken(resp.data.token);
      navigate("/dashboard"); //TODO: check if correct path
    } catch (error) {
      const message = handleAPIError(error, "Login page");
      setErrorMessage(message);
    }
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
