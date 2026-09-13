import { http } from "./http";
import type { SkillInput, SkillsResponse, UserSkill } from "@/types/skills";
export const getSkillsAPI = () => http.get<SkillsResponse>("/users/me/skills");
export const createSkillAPI = (data: SkillInput) =>
  http.post<UserSkill>("/users/me/skills", data);
export const updateSkillAPI = (id: string, data: SkillInput) =>
  http.patch<UserSkill>(`/users/me/skills/${id}`, data);
export const deleteSkillAPI = (id: string) =>
  http.delete(`/users/me/skills/${id}`);
