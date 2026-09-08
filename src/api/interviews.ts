import { http } from "@/api/http";
import type {
  CreateInterviewRequest,
  InterviewWithJob,
} from "@/types/interviews";

export function getInterviewsAPI() {
  return http.get<InterviewWithJob[]>("/interviews");
}

export function createInterviewAPI(
  jobId: string,
  data: CreateInterviewRequest,
) {
  return http.post<InterviewWithJob>(`/jobs/${jobId}/interviews`, data);
}
