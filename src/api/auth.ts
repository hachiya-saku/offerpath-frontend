import { http } from "./http";
import type { LoginRequest, LoginResponse, RefreshResponse, RegisterRequest, RegisterResponse, LogoutResponse } from "@/types/auth";

export function loginAPI(data: LoginRequest) {
  return http.post<LoginResponse>("/auth/login", data);
}

export function refreshTokenAPI() {
  return http.post<RefreshResponse>("/auth/refresh");
}

export function registerAPI(data: RegisterRequest) {
  return http.post<RegisterResponse>("/auth/register", data);
}

export function logoutAPI(accessToken: string) {
  return http.post<LogoutResponse>(
    "/auth/logout",
    undefined,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
}