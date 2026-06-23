import axios from "axios";
import { getToken } from "../utils/auth";

const api = axios.create({
  baseURL: "https://trogontoursnortheast.in/api",
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();

    const isAuthRoute =
      config.url?.includes("/auth/login") ||
      config.url?.includes("/auth/register-admin");

    if (token && !isAuthRoute) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 👑 ADMIN ONLY APIs
export const adminLogin = (data) =>
  api.post("/auth/login", data);

export const adminRegister = (data) =>
  api.post("/auth/register-admin", data);

export default api;
