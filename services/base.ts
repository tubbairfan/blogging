import axios from "axios";
import { clearStoredSession } from "@/lib/auth";

export const AUTH_SESSION_EXPIRED_EVENT = "auth:session-expired";

export const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (!originalRequest || error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }
    if (originalRequest.url?.includes("/users/refresh-token")) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      await API.post("/users/refresh-token");
      return API(originalRequest); 
    } catch (err) {
      clearStoredSession();
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(AUTH_SESSION_EXPIRED_EVENT));
      }
      return Promise.reject(err);
    }
  }
);
