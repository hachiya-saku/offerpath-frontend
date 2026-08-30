import type { JobStatus } from "@/data/mockData";

export type InterviewMode = "ONLINE" | "OFFLINE";

export type InterviewRecord = {
  id: string;
  jobId: number;
  company: string;
  role: string;
  round: JobStatus;
  mode: InterviewMode;
  scheduledAt: string;
  platform?: string;
  meetingUrl?: string;
  meetingId?: string;
  meetingPassword?: string;
  location?: string;
  notes?: string;
};

const INTERVIEWS_KEY = "offerpath-interviews";
const STATUS_KEY = "offerpath-job-statuses";

const demoInterviews: InterviewRecord[] = [
  {
    id: "demo-online-interview",
    jobId: 2,
    company: "Northstar Labs",
    role: "Frontend Developer",
    round: "一面",
    mode: "ONLINE",
    scheduledAt: "2026-09-03T10:30:00+09:00",
    platform: "Zoom",
    meetingUrl: "https://zoom.us/j/1234567890",
    meetingId: "123 456 7890",
    meetingPassword: "offerpath",
    notes: "プロダクト責任者との面接。開発経験と志望動機を整理しておく。",
  },
  {
    id: "demo-offline-interview",
    jobId: 1,
    company: "Layer Nine株式会社",
    role: "フロントエンドエンジニア",
    round: "二面",
    mode: "OFFLINE",
    scheduledAt: "2026-09-08T14:00:00+09:00",
    location: "東京都渋谷区渋谷2丁目24-12 渋谷スクランブルスクエア",
    notes: "受付で面接担当者の名前を伝える。職務経歴書を持参。",
  },
];

export function getInterviews(): InterviewRecord[] {
  const stored = localStorage.getItem(INTERVIEWS_KEY);
  if (!stored) return demoInterviews;
  try {
    return JSON.parse(stored) as InterviewRecord[];
  } catch {
    return [];
  }
}

export function saveInterview(interview: InterviewRecord) {
  localStorage.setItem(
    INTERVIEWS_KEY,
    JSON.stringify([...getInterviews(), interview]),
  );
  const statuses = getStoredStatuses();
  statuses[interview.jobId] = interview.round;
  localStorage.setItem(STATUS_KEY, JSON.stringify(statuses));
}

export function getStoredJobStatus(jobId: number, fallback: JobStatus) {
  return getStoredStatuses()[jobId] ?? fallback;
}

function getStoredStatuses(): Record<number, JobStatus> {
  const stored = localStorage.getItem(STATUS_KEY);
  if (!stored) return {};
  try {
    return JSON.parse(stored) as Record<number, JobStatus>;
  } catch {
    return {};
  }
}
