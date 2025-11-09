// src/context/UserProvider.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserContext from "./UserContext";
import * as authService from "../services/auth";
import { getToken, setToken, clearToken } from "../utils/storage";
import { ROUTES } from "../utils/constants";
import { toast } from "sonner";
import { setOnUnauthorized } from "../services/apiClient";

const DEBUG = import.meta.env.VITE_DEBUG_API === "true";
const log = (...args) => {
  if (DEBUG) console.info("[UserProvider]", ...args);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    // Global 401 handler (when backend returns unauthorized)
    setOnUnauthorized(() => {
      log("Unauthorized – clearing token and redirecting to /auth");
      clearToken();
      if (isMounted) setUser(null);
      if (location.pathname !== ROUTES.AUTH) {
        navigate(ROUTES.AUTH, { replace: true });
      }
    });

    const initAuth = async () => {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        log("Token found in storage, fetching profile...");
        const profile = await authService.getMe(); // hits /auth/profile
        if (isMounted) setUser(profile);
      } catch (error) {
        log("Error fetching profile:", error.message);
        clearToken();
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initAuth();

    return () => {
      isMounted = false;
      setOnUnauthorized(null);
    };
  }, [navigate, location.pathname]);

  const login = async (credentials) => {
    try {
      log("Logging in user:", credentials.email);
      const { token } = await authService.login(credentials);
      log("Login successful, token received:", token ? "yes" : "no");

      setToken(token);

      // Optional but recommended: verify token by hitting /auth/profile
      const profile = await authService.getMe();
      log("Profile fetched after login:", profile);

      setUser(profile);

      toast.success("Welcome back!");
      navigate(ROUTES.HOME, { replace: true });
    } catch (error) {
      log("Login error:", error.message);
      toast.error(error.message || "Login failed");
      throw error;
    }
  };

  const signup = async (data) => {
    try {
      log("Signing up user:", data.email);
      const { user: userData, token } = await authService.signup(data);
      setToken(token);
      setUser(userData);
      toast.success("Account created successfully!");
      navigate(ROUTES.HOME, { replace: true });
    } catch (error) {
      log("Signup error:", error.message);
      toast.error(error.message || "Signup failed");
      throw error;
    }
  };

  const logout = async () => {
    try {
      log("Logging out user...");
      await authService.logout(); // token auto-sent by interceptor
    } catch (error) {
      log("Logout error (ignored):", error.message);
    } finally {
      clearToken();
      setUser(null);
      toast.success("Logged out successfully");
      navigate(ROUTES.AUTH, { replace: true });
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
