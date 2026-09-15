export interface User {
    id: string;
    name: string;
    email: string;
    picture?: string;
}
export interface AuthData {
    accessToken: string;
    user: User;
}
