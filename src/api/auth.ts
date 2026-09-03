import { http } from "./http";
import type { LoginRequest, LoginResponse } from "@/types/auth";

export function loginAPI(data: LoginRequest) {
  return http.post<LoginResponse>("/auth/login", data);
}
