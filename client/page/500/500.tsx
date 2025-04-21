/* Author(s): Tobias Vinblad */

import React from "react";
import { Link } from "react-router-dom";
import "./500.css";

/**
 * A React functional component that renders a 500 Internal Server Error page.
 * This page is displayed when the server encounters an unexpected condition
 * that prevents it from fulfilling the request.
 *
 * @returns {JSX.Element} The rendered 500 error page.
 */
export default function Error500() {
  return (
    <div className="error-500-container">
      <h1 className="error-500-title">500 - Internal Server Error</h1>
      <p className="error-500-message">
        Oops! Something went wrong on our end. Please try again later.
      </p>
      <Link to="/" className="error-500-button">
        Go Back to Home
      </Link>
    </div>
  );
}
