export interface User {
    id: string;
    name: string;
    email: string;
    profileImageUrl?: string;
}
export interface AuthData {
    accessToken: string;
    user: User;
}
