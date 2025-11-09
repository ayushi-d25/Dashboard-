// src/services/apiClient.js
import axios from "axios";
import { getToken, clearToken } from "../utils/storage";

let onUnauthorized = null;
export const setOnUnauthorized = (fn) => {
  onUnauthorized = typeof fn === "function" ? fn : null;
};

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
  // You can tweak these if you like:
  timeout: 20000, // 20s
  withCredentials: false, // set true only if your backend uses cookies
});

// Request interceptor: attach Bearer token if present
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      // Ensure exact format: "Bearer <jwt>"
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Make sure we don't send a stale header if token was cleared elsewhere
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: normalize errors and optionally handle 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Distinguish between network/timeout vs server responses
    const status = error.response?.status ?? null;

    // Backend-provided message if available; fall back to Axios error message; else generic
    const message =
      error.response?.data?.message ||
      (error.code === "ECONNABORTED" && "Request timed out") ||
      error.message ||
      "Something went wrong";

    // If unauthorized, optionally allow app-level handling (logout/redirect)
    if (status === 401 && typeof onUnauthorized === "function") {
      try {
        onUnauthorized();
      } catch (_) {
        /* no-op */
      }
    }

    // Reject a clean object your UI can rely on
    return Promise.reject({
      message,
      status,
      // Optionally expose raw data if you need advanced handling in some screens
      data: error.response?.data,
    });
  }
);

export default apiClient;
