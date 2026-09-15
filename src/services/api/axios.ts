import { ENV } from "@/config.env";
import { AUTH_ENDPOINTS } from "@/constants/auth";
import { store } from "@/store";
import { clearAuth, setAuth } from "@/store/authSlice";
import type { ApiResponse } from "@/types/api";
import type { AuthData } from "@/types/auth";
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

interface RetryConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

export const apiClient = axios.create({
    baseURL: ENV.API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
    const accessToken = store.getState().auth.accessToken;

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as RetryConfig | undefined;

        if (!originalRequest) {
            return Promise.reject(error);
        }

        const isRefreshRequest = originalRequest.url === AUTH_ENDPOINTS.REFRESH;

        if (error.response?.status !== 401 || originalRequest._retry || isRefreshRequest) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            const response = await apiClient.post<ApiResponse<AuthData>>(AUTH_ENDPOINTS.REFRESH);

            const authData = response.data.data;

            store.dispatch(setAuth(authData));

            originalRequest.headers.Authorization = `Bearer ${authData.accessToken}`;

            return apiClient(originalRequest);
        } catch (refreshError) {
            store.dispatch(clearAuth());

            window.location.href = "/login";

            return Promise.reject(refreshError);
        }
    },
);
