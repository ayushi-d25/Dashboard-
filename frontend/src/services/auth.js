import api from "./apiClient";

const DEBUG = import.meta.env.VITE_DEBUG_API === "true";
const log = (...args) => { if (DEBUG) console.info("[auth]", ...args); };


const normalizeLoginResponse = (axiosResponse) => {

  const raw = axiosResponse?.data ?? {};
  const data = raw?.data ?? {};
  const token = data?.token ?? raw?.token ?? null;
  const user  = data?.user  ?? raw?.user  ?? null;
  return { token, user, message: raw?.message, status: raw?.status };
};


export const signup = async (payload) => {
  log("baseURL:", api.defaults.baseURL);
  log("→ POST /auth/signup", { email: payload?.email });
  const res = await api.post("/auth/register", payload);
  log("← /auth/signup", res.status);
  const norm = normalizeLoginResponse(res);
  return { token: norm.token, user: norm.user, message: norm.message };
};


export const login = async (credentials) => {
  log("baseURL:", api.defaults.baseURL);
  log("→ POST /auth/login", { email: credentials?.email });
  const res = await api.post("/auth/login", credentials);
  log("← /auth/login", res.status);

  const norm = normalizeLoginResponse(res);
  if (!norm.token) {
    
    throw { message: "Login succeeded but no token found in response", status: res.status, data: res.data };
  }
  return { token: norm.token, user: norm.user, message: norm.message };
};


export const getMe = async () => {
  log("→ GET /auth/profile");
  const res = await api.get("/auth/profile");
  log("← /auth/profile", res.status);

 
  return res.data?.data ?? res.data;
};


export const logout = async () => {
  log("→ POST /auth/logout");
  const res = await api.post("/auth/logout");
  log("← /auth/logout", res.status);
  return res.data;
};
