export type SkillLevel = "PROFICIENT" | "INTERMEDIATE" | "BEGINNER";
export type UserSkill = {
  id: string;
  skillId: string;
  name: string;
  level: SkillLevel;
  yearsLabel: string | null;
  color: string | null;
};
export type SkillInput = {
  name: string;
  level: SkillLevel;
  yearsLabel?: string | null;
};
export type SkillsResponse = {
  items: UserSkill[];
  averageMatch: number | null;
};
