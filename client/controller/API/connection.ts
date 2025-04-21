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
  console.log("Token:", token);

  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default API;

/**
 * Handles and formats API errors for logging and user-friendly messages.
 *
 * @param error - The error object, which may contain response, request, or message details.
 * @param messagePrefix - A string prefix to provide context about where the error occurred.
 * @returns A formatted error message string based on the error details.
 */
export function handleAPIError(error: any, messagePrefix: string): string {
  console.error(`Error in ${messagePrefix}:`, error);
  if (error.response) {
    return `${error.response.data.message || error.response.statusText}`;
  } else if (error.request) {
    return "No response received from the server.";
  } else {
    return error.message || "An unexpected error occurred.";
  }
}
