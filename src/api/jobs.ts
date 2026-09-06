import { http } from "./http";
import type { CreateJobRequest, Job, UpdateJobRequest } from "@/types/jobs";

export function getJobsAPI(accessToken: string) {
  return http.get<Job[]>("/jobs", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function createJobAPI(accessToken: string, data: CreateJobRequest) {
  return http.post<Job>("/jobs", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function updateJobAPI(
  accessToken: string,
  jobId: string,
  data: UpdateJobRequest,
) {
  return http.patch<Job>(`/jobs/${jobId}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function deleteJobAPI(accessToken: string, jobId: string) {
  return http.delete<Job>(`/jobs/${jobId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function getJobAPI(accessToken: string, jobId: string) {
  return http.get<Job>(`/jobs/${jobId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
