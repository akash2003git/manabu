import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // If a token is already provided in the request, do nothing
    if (config.headers?.Authorization) {
      return config;
    }

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken.replace(/"/g, "")}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
