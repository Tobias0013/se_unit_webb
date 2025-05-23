/* Author(s): Tobias Vinblad */

import axios from "axios";
import { API_URL } from "../config";

/**
 * Creates an Axios instance for making API requests.
 *
 * This instance is configured with a base URL and default headers.
 * The base URL is set to the value of `API_URL` imported from the .env.
 */
const API = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

/**
 * Sets up an interceptor for the API instance to handle request configuration.
 *
 * This interceptor retrieves a token from session storage and adds it to the
 * Authorization header of the request if it exists.
 */
API.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default API;

/**
 * Handles API errors by logging the error and returning an appropriate error message.
 * Optionally, it can navigate to a specific route in case of certain errors.
 *
 * @param error - The error object received from the API call.
 * @param messagePrefix - A string prefix to include in the error log for context.
 * @param nav - (Optional) A navigation function to redirect the user in case of critical errors.
 *
 * @returns A string describing the error, either from the server response or a default message.
 */
export function handleAPIError(
  error: any,
  messagePrefix: string,
  nav?: any
): string {
  console.error(`Error in ${messagePrefix}:`, error);
  if (error.response) {
    return `${error.response.data.message || error.response.statusText}`;
  } else if (error.request) {
    if (nav) {
      nav("/500");
    }
    return "No response received from the server.";
  } else {
    if (nav) {
      nav("/500");
    }
    return error.message || "An unexpected error occurred.";
  }
}
