import axios from 'axios';
import { API_URL } from '../config';

/**
 * Axios instance configured with the base URL and default headers.
 */
export default axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * Handle an API error
 * 
 * Logs the error and returns a formatted error message based on the type of error.
 * 
 * @param error - The error object returned by the API call.
 * @param messagePrefix - A prefix to include in the log message for context.
 * @returns A formatted error message string.
 */
export function handleAPIError(error: any, messagePrefix: string): string {
    console.log(`Error in ${messagePrefix}:`, error);
    if (error.response) {
        return `${error.response.data.message}`;
    }
    else if (error.request) {
        return "Error: No response received";
    }
    else {
        return "An unexpected error occurred";
    }
}