import { http } from "./http";
import type {
  CreateJobRequest,
  Job,
  JobStatusHistory,
  RejectJobRequest,
  UpdateJobRequest,
} from "@/types/jobs";

export function getJobsAPI() {
  return http.get<Job[]>("/jobs");
}

export function createJobAPI(data: CreateJobRequest) {
  return http.post<Job>("/jobs", data);
}

export function updateJobAPI(
  jobId: string,
  data: UpdateJobRequest,
) {
  return http.patch<Job>(`/jobs/${jobId}`, data);
}

export function deleteJobAPI(jobId: string) {
  return http.delete<Job>(`/jobs/${jobId}`);
}

export function getJobAPI(jobId: string) {
  return http.get<Job>(`/jobs/${jobId}`);
}

export function getJobStatusHistoryAPI(jobId: string) {
  return http.get<JobStatusHistory[]>(`/jobs/${jobId}/status-history`);
}

export function advanceJobStatusAPI(jobId: string) {
  return http.patch<Job>(`/jobs/${jobId}/status/advance`);
}

export function rejectJobStatusAPI(jobId: string, data: RejectJobRequest) {
  return http.patch<Job>(`/jobs/${jobId}/status/reject`, data);
}

export function offerJobStatusAPI(jobId: string) {
  return http.patch<Job>(`/jobs/${jobId}/status/offer`);
}

export function undoJobStatusAPI(jobId: string) {
  return http.patch<Job>(`/jobs/${jobId}/status/undo`);
}
