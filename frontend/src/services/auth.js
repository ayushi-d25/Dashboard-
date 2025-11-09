// src/services/auth.js
import api from "./apiClient";

/**
 * Turn on logs by putting this in your .env and restarting dev server:
 *   VITE_DEBUG_API=true
 */
const DEBUG = import.meta.env.VITE_DEBUG_API === "true";
const log = (...args) => { if (DEBUG) console.info("[auth]", ...args); };

/** Safely normalize your backend shape to { token, user } */
const normalizeLoginResponse = (axiosResponse) => {
  // Your sample payload:
  // {
  //   "status": 200,
  //   "message": "User Logged In Successfully",
  //   "data": { "token": "<jwt>" }
  // }
  const raw = axiosResponse?.data ?? {};
  const data = raw?.data ?? {};
  const token = data?.token ?? raw?.token ?? null;
  const user  = data?.user  ?? raw?.user  ?? null;
  return { token, user, message: raw?.message, status: raw?.status };
};

/** POST /auth/signup -> returns { token, user } (normalized if backend wraps in data) */
export const signup = async (payload) => {
  log("baseURL:", api.defaults.baseURL);
  log("→ POST /auth/signup", { email: payload?.email });
  const res = await api.post("/auth/signup", payload);
  log("← /auth/signup", res.status);
  const norm = normalizeLoginResponse(res);
  return { token: norm.token, user: norm.user, message: norm.message };
};

/** POST /auth/login -> returns { token, user } (normalized) */
export const login = async (credentials) => {
  log("baseURL:", api.defaults.baseURL);
  log("→ POST /auth/login", { email: credentials?.email });
  const res = await api.post("/auth/login", credentials);
  log("← /auth/login", res.status);

  const norm = normalizeLoginResponse(res);
  if (!norm.token) {
    // Help surface backend mismatch early
    throw { message: "Login succeeded but no token found in response", status: res.status, data: res.data };
  }
  return { token: norm.token, user: norm.user, message: norm.message };
};

/** GET /auth/profile (your 'me' route). Returns the profile object. */
export const getMe = async () => {
  log("→ GET /auth/profile");
  const res = await api.get("/auth/profile");
  log("← /auth/profile", res.status);

  // Many APIs wrap data in .data; return the inner object if present.
  // If your backend returns the profile directly, this still works.
  return res.data?.data ?? res.data;
};

/** POST /auth/logout (change to GET if your backend uses GET) */
export const logout = async () => {
  log("→ POST /auth/logout");
  const res = await api.post("/auth/logout");
  log("← /auth/logout", res.status);
  return res.data;
};
