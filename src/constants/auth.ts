export const AUTH_ENDPOINTS = {
    GOOGLE_LOGIN: "/api/v1/auth/oauth2/authorization/google",
    OAUTH_EXCHANGE: "/api/v1/auth/oauth/exchange",
    REFRESH: "/api/v1/auth/refresh",
    LOGOUT: "/api/v1/auth/logout",
} as const;
