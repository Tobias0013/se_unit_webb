/* Author(s): Tobias Vinblad */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./auth.css";
import { register } from "../../controller/API/auth";
import { handleAPIError } from "../../controller/API/connection";
import {
  getPasswordStrength,
  validPassowrd,
} from "../../controller/passwordChecker";

/**
 * RegisterPage component allows users to register by providing a username, password, and an optional admin status.
 * It includes form validation and password strength checking.
 *
 * @example
 * return (
 *   <RegisterPage />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 * 
 * @throws {Error} If login fails, an error message is set.
 */

export default function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [strengthText, setStrengthText] = useState<string>("");

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    if (!validPassowrd(password)) {
      setErrorMessage("Password is too weak");
      return;
    }
    try {
      await register(username, password, isAdmin);
      navigate("/login");
    } catch (error) {
      const message = handleAPIError(error, "Register page");
      setErrorMessage(message);
    }
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    const strength = getPasswordStrength(e.target.value);
    setStrengthText(`Password strength: ${strength.value}`);
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
          <p style={{ fontSize: "1.75rem" }}>{strengthText}</p>
          <input
            type="password"
            placeholder="Password"
            onChange={onPasswordChange}
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
