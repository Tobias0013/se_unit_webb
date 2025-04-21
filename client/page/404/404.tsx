/* Author(s): Tobias Vinblad */

import React from "react";
import { Link } from "react-router-dom";
import "./404.css";

/**
 * A React functional component that renders a 404 Not Found page.
 * This component displays a message indicating that the requested page
 * could not be found, along with a link to navigate back to the home page.
 *
 * @returns {JSX.Element} The rendered 404 Not Found page.
 */
export default function NotFoundPage() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className="not-found-link">
        Go Back to Home
      </Link>
    </div>
  );
}
