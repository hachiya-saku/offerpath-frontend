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

export function getInterviews(): InterviewRecord[] {
  const stored = localStorage.getItem(INTERVIEWS_KEY);
  if (!stored) return [];
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
