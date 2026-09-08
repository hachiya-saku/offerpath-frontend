import type { JobCompany, JobStatus } from "@/types/jobs";

export type InterviewMode = "ONLINE" | "OFFLINE";

export type Interview = {
  id: string;
  jobId: string;
  round: JobStatus;
  previousJobStatus: JobStatus | null;
  mode: InterviewMode;
  scheduledAt: string;
  platform: string | null;
  meetingUrl: string | null;
  meetingId: string | null;
  meetingPassword: string | null;
  location: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type InterviewWithJob = Interview & {
  job: {
    id: string;
    positionName: string;
    company: JobCompany;
  };
};

export type CreateInterviewRequest = {
  round: Extract<
    JobStatus,
    | "FIRST_INTERVIEW"
    | "SECOND_INTERVIEW"
    | "THIRD_INTERVIEW"
    | "FINAL_INTERVIEW"
  >;
  mode: InterviewMode;
  scheduledAt: string;
  platform?: string;
  meetingUrl?: string;
  meetingId?: string;
  meetingPassword?: string;
  location?: string;
  notes?: string;
};
