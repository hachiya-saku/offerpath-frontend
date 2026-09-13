import { http } from "./http";
import type { DashboardSummary } from "@/types/dashboard";
export const getDashboardAPI = (signal?: AbortSignal) =>
  http.get<DashboardSummary>("/dashboard/summary", { signal });
