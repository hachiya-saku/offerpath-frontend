import { http } from "@/api/http";
import type {
    UserProfile,
    UpdateProfileRequest
} from "@/types/auth";

export function getUserProfileAPI(accessToken: string) {
    return http.get<UserProfile>("/users/me", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export function updateUserProfileAPI(accessToken: string, data: UpdateProfileRequest) {
    return http.patch<UserProfile>("/users/me", data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}