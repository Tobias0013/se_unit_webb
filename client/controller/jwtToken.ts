export type Token = {
  user_id: number;
  username: string;
  admin: boolean;
  iat: number;
  exp: number;
};

function jwtDecode(token: string): Token {
  return JSON.parse(atob(token.split(".")[1]));
}

export function setToken(token: string): void {
  sessionStorage.setItem("token", token);
}

export function tokenExists(): boolean {
  const token = sessionStorage.getItem("token");
  return token !== null;
}

export function tokenPayload(): Token | null {
  const token = sessionStorage.getItem("token");
  if (!token) return null;

  return jwtDecode(token);
}

export function getUsername(): string {
  const token = sessionStorage.getItem("token");
  if (!token) return "";

  const payload: any = jwtDecode(token);
  return payload.username;
}

export function getUserID(): number {
  const token = sessionStorage.getItem("token");
  if (!token) return -1;

  const payload: any = jwtDecode(token);
  return payload.user_id;
}

export function isAdmin(): boolean {
  const token = sessionStorage.getItem("token");
  if (!token) return false;

  const payload: any = jwtDecode(token);
  return payload.admin === true;
}

export function clearToken(): void {
  sessionStorage.removeItem("token");
}
