// Small client for the SkillPath FastAPI backend (PostgreSQL).
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const TOKEN_KEY = "skillpath-token";

const LAST_EMAIL_KEY = "skillpath-last-email";

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY) || "";
  } catch {
    return "";
  }
}

// remember = true: the login is kept on this device (localStorage), so the learner does not
// have to sign in again next time. false: it ends when the browser is closed (sessionStorage).
export function setToken(token, remember = true) {
  try {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    if (token) (remember ? localStorage : sessionStorage).setItem(TOKEN_KEY, token);
  } catch {
    // storage unavailable
  }
}

// The email used last time, so the sign-in form can be filled in. Passwords are never stored.
export function getLastEmail() {
  try {
    return localStorage.getItem(LAST_EMAIL_KEY) || "";
  } catch {
    return "";
  }
}

function rememberEmail(email, remember) {
  try {
    if (remember) localStorage.setItem(LAST_EMAIL_KEY, email);
    else localStorage.removeItem(LAST_EMAIL_KEY);
  } catch {
    // storage unavailable
  }
}

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

function errorMessage(data, status) {
  const detail = data?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail) && detail[0]?.msg) return detail[0].msg;
  return `Request failed (${status})`;
}

export async function api(path, { method = "GET", body, auth = true } = {}) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth && getToken()) headers.Authorization = `Bearer ${getToken()}`;

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError("Cannot reach the server. Is the backend running?", 0);
  }

  if (response.status === 204) return null;
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    if (response.status === 401 && auth) {
      window.dispatchEvent(new Event("skillpath-auth-expired"));
    }
    throw new ApiError(errorMessage(data, response.status), response.status);
  }
  return data;
}

export async function login(email, password, remember = true) {
  const data = await api("/auth/login", {
    method: "POST",
    body: { email, password, remember },
    auth: false,
  });
  setToken(data.access_token, remember);
  rememberEmail(email, remember);
}

export async function register(email, password, remember = true) {
  const data = await api("/auth/register", {
    method: "POST",
    body: { email, password, remember },
    auth: false,
  });
  setToken(data.access_token, remember);
  rememberEmail(email, remember);
}
