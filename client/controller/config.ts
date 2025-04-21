/* Author(s): Tobias Vinblad */

export const API_URL = getAPIURL();
/**
 * Retrieves the API URL from the environment variables.
 *
 * If the `MOCK` environment variable is set to "true", it returns an empty string.
 * Otherwise, it fetches the `API_URL` from the environment variables.
 *
 * If the `API_URL` is not defined, empty, or not a string, it stops the process
 * with an error message indicating that the appropriate API is missing in the environment file.
 *
 * @returns {string} The API URL or an empty string if in mock mode or if there's an error.
 */
function getAPIURL() {
  if (process.env.MOCK === "true") {
    return "";
  }
  const url = process.env.API_URL;
  if (!url || url === "" || typeof url !== "string") {
    stopProcess("Missing appropriate API in environment file");
    return "";
  }
  return url;
}

export const MOCK = getMock();
/**
 * Determines if the application should use mock data based on the environment variable `MOCK`.
 *
 * @returns {boolean} - Returns `true` if the `MOCK` environment variable is set to "true", otherwise returns `false`.
 */
function getMock() {
  const mock = process.env.MOCK;
  if (mock && mock === "true") {
    return true;
  }
  return false;
}

/**
 * Logs an error message to the console and terminates the process.
 *
 * @param message - The error message to be logged.
 */
function stopProcess(message: string) {
  console.error(message);
  process.exit(0);
}
