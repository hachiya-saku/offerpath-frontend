import type { JobStatus } from "@/data/mockData";
import type { Language } from "@/i18n/LanguageContext";

const statusLabels: Record<JobStatus, Record<Language, string>> = {
  想投: { ja: "応募検討", zh: "想投" },
  已投: { ja: "応募済み", zh: "已投" },
  书类选考: { ja: "書類選考", zh: "书类选考" },
  一面: { ja: "一次面接", zh: "一面" },
  二面: { ja: "二次面接", zh: "二面" },
  三面: { ja: "三次面接", zh: "三面" },
  终面: { ja: "最終面接", zh: "终面" },
  offer: { ja: "内定", zh: "Offer" },
  挂了: { ja: "不採用", zh: "挂了" },
};

const skillLevelLabels: Record<string, Record<Language, string>> = {
  熟练: { ja: "熟練", zh: "熟练" },
  一般: { ja: "標準", zh: "一般" },
  了解: { ja: "基礎", zh: "了解" },
};

const experienceLabels: Record<string, Record<Language, string>> = {
  "2年": { ja: "2年", zh: "2年" },
  "1年": { ja: "1年", zh: "1年" },
  "3年": { ja: "3年", zh: "3年" },
  "6个月": { ja: "6か月", zh: "6个月" },
  学习中: { ja: "学習中", zh: "学习中" },
};

export const getJobStatusLabel = (status: JobStatus, language: Language) =>
  statusLabels[status][language];

export const getSkillLevelLabel = (level: string, language: Language) =>
  skillLevelLabels[level]?.[language] ?? level;

export const getExperienceLabel = (value: string, language: Language) =>
  experienceLabels[value]?.[language] ?? value;
