import axios, { AxiosError } from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "/api";

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      const onLoginPage = window.location.pathname.startsWith("/login");
      if (!onLoginPage) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);
