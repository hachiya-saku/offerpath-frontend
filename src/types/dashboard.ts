import type { JobStatus } from "./jobs";
export type DashboardSummary = {
  generatedAt: string;
  totals: {
    tracked: number;
    addedThisMonth: number;
    inProgress: number;
    upcomingInterviews: number;
    offers: number;
    scoredJobs: number;
    averageMatch: number | null;
  };
  statusCounts: Record<JobStatus, number>;
  conversion: {
    applied: number;
    interviewed: number;
    finalInterview: number;
    offers: number;
    interviewRate: number | null;
    offerRate: number | null;
  };
  matchDistribution: { key: string; count: number }[];
  unscoredJobs: number;
  recentJobs: {
    id: string;
    positionName: string;
    status: JobStatus;
    company: { id: string; name: string };
    updatedAt: string;
    matchScore: number | null;
  }[];
};
