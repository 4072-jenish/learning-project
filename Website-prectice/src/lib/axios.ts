import axios from "axios";

export const api = axios.create({
  baseURL: "https://learning-project-279l.onrender.com/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

