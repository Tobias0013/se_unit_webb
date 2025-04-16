import axios from "axios";
import { API_URL } from "../config";

const API = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export default API;

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
