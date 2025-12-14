import axios from "axios";

const baseUrl =
  import.meta.env.VITE_MODE === "development"
    ? "http://localhost:3000/api"
    : "https://clack-theta.vercel.app/api";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});
