import { http } from "@/api/http";
import type { UserProfile, UpdateProfileRequest } from "@/types/auth";

export function getUserProfileAPI() {
  return http.get<UserProfile>("/users/me");
}

export function updateUserProfileAPI(data: UpdateProfileRequest) {
  return http.patch<UserProfile>("/users/me", data);
}
