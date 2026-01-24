import axios from "axios";

const api = axios.create({
  baseURL: "https://doneit-5ft1.onrender.com/api",
  withCredentials: false,
});

export const forgotPassword = (email) =>
  api.post("/auth/forgot-password", { email });
