import axios from "axios";

const api = axios.create({
  baseURL: process.env.BACKEND_URI || "http://localhost:2880/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(undefined, async (error) => {
  if (error.response?.status === 401) {
    return api(error.config); // Retry original request
  }

  throw error;
});

export { api };
