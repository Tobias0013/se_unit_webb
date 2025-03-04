export type Token = {
  user_id: number;
  username: string;
  admin: boolean;
  iat: number;
  exp: number;
};

/**
 * Decodes a JSON Web Token (JWT) and returns the payload as a Token object.
 *
 * @param token - The JWT string to decode.
 * @returns The decoded payload as a Token object.
 */
function jwtDecode(token: string): Token {
  return JSON.parse(atob(token.split(".")[1]));
}

/**
 * Stores the provided JWT token in the session storage.
 *
 * @param token - The JWT token to be stored.
 */
export function setToken(token: string): void {
  sessionStorage.setItem("token", token);
}

/**
 * Checks if a token exists in the session storage.
 *
 * @returns {boolean} - Returns `true` if a token exists, otherwise `false`.
 */
export function tokenExists(): boolean {
  const token = sessionStorage.getItem("token");
  return token !== null;
}

/**
 * Retrieves the JWT token from session storage and decodes its payload.
 *
 * @returns {Token | null} The decoded token payload if a token exists in session storage, otherwise null.
 */
export function tokenPayload(): Token | null {
  const token = sessionStorage.getItem("token");
  if (!token) return null;

  return jwtDecode(token);
}

/**
 * Retrieves the username from the JWT token stored in session storage.
 *
 * @returns {string} The username extracted from the JWT token. Returns an empty string if the token is not found or if the username is not present in the token payload.
 */
export function getUsername(): string {
  const token = sessionStorage.getItem("token");
  if (!token) return "";

  const payload: any = jwtDecode(token);
  return payload.username;
}

/**
 * Retrieves the user ID from the JWT token stored in session storage.
 *
 * @returns {number} The user ID if the token is present and valid, otherwise -1.
 */
export function getUserID(): number {
  const token = sessionStorage.getItem("token");
  if (!token) return -1;

  const payload: any = jwtDecode(token);
  return payload.user_id;
}

/**
 * Checks if the current user is an admin based on the JWT token stored in sessionStorage.
 *
 * @returns {boolean} - Returns `true` if the user is an admin, otherwise `false`.
 */
export function isAdmin(): boolean {
  const token = sessionStorage.getItem("token");
  if (!token) return false;

  const payload: any = jwtDecode(token);
  return payload.admin === true;
}

/**
 * Clears the JWT token from the session storage.
 * This function removes the item with the key "token" from the session storage.
 */
export function clearToken(): void {
  sessionStorage.removeItem("token");
}
