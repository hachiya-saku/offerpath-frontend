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

export type JobStatusChangeType = "ADVANCE" | "CORRECTION" | "UNDO";

export type JobStatusHistoryRecord = {
  id: string;
  jobId: number;
  fromStatus: JobStatus;
  toStatus: JobStatus;
  changeType: JobStatusChangeType;
  interviewId?: string;
  reason?: string;
  createdAt: string;
};

const INTERVIEWS_KEY = "offerpath-interviews";
const STATUS_KEY = "offerpath-job-statuses";
const STATUS_HISTORY_KEY = "offerpath-job-status-history";
const LEGACY_UNDO_RECONCILED_KEY = "offerpath-undo-reconciled-v1";
export const INTERVIEWS_CHANGED_EVENT = "offerpath:interviews-changed";

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
  {
    id: "demo-completed-interview",
    jobId: 5,
    company: "Data Loom株式会社",
    role: "プロダクトエンジニア",
    round: "一面",
    mode: "ONLINE",
    scheduledAt: "2026-08-24T11:00:00+09:00",
    platform: "Google Meet",
    meetingUrl: "https://meet.google.com/abc-defg-hij",
    notes: "一次面接終了。技術スタックとチーム開発について確認した。",
  },
];

export function getInterviews(): InterviewRecord[] {
  const stored = localStorage.getItem(INTERVIEWS_KEY);
  if (!stored) return demoInterviews;
  try {
    const interviews = JSON.parse(stored) as InterviewRecord[];
    const includeLegacyUndos =
      localStorage.getItem(LEGACY_UNDO_RECONCILED_KEY) !== "true";
    const reconciled = reconcileUndoneInterviews(
      interviews,
      getStoredStatusHistory(),
      includeLegacyUndos,
    );
    if (includeLegacyUndos) {
      localStorage.setItem(LEGACY_UNDO_RECONCILED_KEY, "true");
    }
    if (reconciled.length !== interviews.length) {
      localStorage.setItem(INTERVIEWS_KEY, JSON.stringify(reconciled));
    }
    return reconciled;
  } catch {
    return [];
  }
}

export function saveInterview(
  interview: InterviewRecord,
  previousStatus: JobStatus,
) {
  localStorage.setItem(
    INTERVIEWS_KEY,
    JSON.stringify([...getInterviews(), interview]),
  );
  notifyInterviewsChanged();
  const statuses = getStoredStatuses();
  statuses[interview.jobId] = interview.round;
  localStorage.setItem(STATUS_KEY, JSON.stringify(statuses));
  appendStatusHistory({
    id: crypto.randomUUID(),
    jobId: interview.jobId,
    fromStatus: previousStatus,
    toStatus: interview.round,
    changeType: "ADVANCE",
    interviewId: interview.id,
    createdAt: new Date().toISOString(),
  });
}

export function undoInterview(
  interviewId: string,
  jobId: number,
  previousStatus: JobStatus,
) {
  const interview = getInterviews().find((item) => item.id === interviewId);
  if (!interview) return false;

  const remainingInterviews = getInterviews().filter(
    (item) => item.id !== interviewId,
  );
  localStorage.setItem(INTERVIEWS_KEY, JSON.stringify(remainingInterviews));
  notifyInterviewsChanged();
  const statuses = getStoredStatuses();
  statuses[jobId] = previousStatus;
  localStorage.setItem(STATUS_KEY, JSON.stringify(statuses));
  appendStatusHistory({
    id: crypto.randomUUID(),
    jobId,
    fromStatus: interview.round,
    toStatus: previousStatus,
    changeType: "UNDO",
    interviewId,
    reason: "Interview scheduling undone",
    createdAt: new Date().toISOString(),
  });
  return true;
}

export function correctJobStatus(
  jobId: number,
  fromStatus: JobStatus,
  toStatus: JobStatus,
  reason?: string,
) {
  const statuses = getStoredStatuses();
  statuses[jobId] = toStatus;
  localStorage.setItem(STATUS_KEY, JSON.stringify(statuses));
  appendStatusHistory({
    id: crypto.randomUUID(),
    jobId,
    fromStatus,
    toStatus,
    changeType: "CORRECTION",
    reason,
    createdAt: new Date().toISOString(),
  });
}

export function getJobStatusHistory(jobId: number) {
  return getStoredStatusHistory()
    .filter((item) => item.jobId === jobId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
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

function appendStatusHistory(history: JobStatusHistoryRecord) {
  localStorage.setItem(
    STATUS_HISTORY_KEY,
    JSON.stringify([...getStoredStatusHistory(), history]),
  );
}

function getStoredStatusHistory(): JobStatusHistoryRecord[] {
  const stored = localStorage.getItem(STATUS_HISTORY_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored) as JobStatusHistoryRecord[];
  } catch {
    return [];
  }
}

function notifyInterviewsChanged() {
  window.dispatchEvent(new Event(INTERVIEWS_CHANGED_EVENT));
}

function reconcileUndoneInterviews(
  interviews: InterviewRecord[],
  history: JobStatusHistoryRecord[],
  includeLegacyUndos: boolean,
) {
  const reconciled = [...interviews];

  for (const change of history) {
    if (change.changeType !== "UNDO") continue;
    if (!change.interviewId && !includeLegacyUndos) continue;

    const index = change.interviewId
      ? reconciled.findIndex((item) => item.id === change.interviewId)
      : reconciled.findLastIndex(
          (item) =>
            !item.id.startsWith("demo-") &&
            item.jobId === change.jobId &&
            item.round === change.fromStatus,
        );

    if (index >= 0) reconciled.splice(index, 1);
  }

  return reconciled;
}
