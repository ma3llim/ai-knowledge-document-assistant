import { AUTH_ENDPOINTS } from "@/constants/auth";
import { apiClient } from "./axios";

import type { ApiResponse } from "@/types/api";
import type { AuthData } from "@/types/auth";

interface OAuthExchangeRequest {
    code: string;
}

export const exchangeOAuthCode = async (request: OAuthExchangeRequest): Promise<AuthData> => {
    const response = await apiClient.post<ApiResponse<AuthData>>(AUTH_ENDPOINTS.OAUTH_EXCHANGE, request);
    return response.data.data;
};
export const logout = async (): Promise<void> => {
    await apiClient.post(AUTH_ENDPOINTS.LOGOUT);
};
