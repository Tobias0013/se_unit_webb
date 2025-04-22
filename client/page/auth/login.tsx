/* Author(s): Tobias Vinblad */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import "./auth.css";
import { login } from "../../controller/API/auth";
import { handleAPIError } from "../../controller/API/connection";
import { setToken } from "../../controller/jwtToken";

/**
 * LoginPage component renders a login form for user authentication.
 *
 * @returns {JSX.Element} The rendered login page component.
 *
 * @remarks
 * This component uses React hooks for state management and navigation.
 * It handles form submission, validates input fields, and displays error messages.
 *
 * @example
 * ```
 * return (
 *   <LoginPage />
 * )
 * ```
 *
 * @throws {Error} If login fails, an error message is set.
 */
export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const mutation = useMutation({
    mutationFn: async () => {
      const resp = await login(username, password);
      return resp;
    },
    onError: (error) => {
      const message = handleAPIError(error, "Login page", navigate);
      setErrorMessage(message);
    },
    onSuccess: (resp) => {
      setToken(resp.data.token);
      navigate("/devices");
    },
  });

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    mutation.mutate();
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
