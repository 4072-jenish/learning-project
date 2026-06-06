import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.PUBLIC_API_BASE_URL,
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export const adminAnalytics = async () => {
    return await api.get("/admin/analytics")
}

export default api;