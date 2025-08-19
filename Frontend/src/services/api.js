import axios from "axios";

const api = axios.create({
    // baseURL: import.meta.env.VITE_API_URL || "http://localhost:8800"
    baseURL: "http://localhost:8800"
});

export default api;