import { ENV } from "@/config.env";
import axios from "axios";

export const apiClient = axios.create({
    baseURL: ENV.API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
