export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthUser = {
    id: string;
    email: string;
    displayName: string;
}

export type TokenPair = {
    accessToken: string;
    refreshToken: string;
}

export type LoginResponse = TokenPair & {
    user: AuthUser;
}