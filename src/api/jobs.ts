import { http } from "./http";
import type { CreateJobRequest, Job, UpdateJobRequest } from "@/types/jobs";

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
