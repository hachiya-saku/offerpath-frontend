import type { JobStatus } from "@/types/jobs";

export type CompanyJob = {
  id: string;
  positionName: string;
  platform: string;
  status: JobStatus;
  annualSalaryMin: number | null;
  annualSalaryMax: number | null;
  salaryCurrency: string;
  updatedAt: string;
};

export type Company = {
  id: string;
  name: string;
  website: string | null;
  industry: string | null;
  size: string | null;
  location: string | null;
  description: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  jobs: CompanyJob[];
};

export type UpdateCompanyRequest = {
  name?: string;
  website?: string | null;
  industry?: string | null;
  size?: string | null;
  location?: string | null;
  description?: string | null;
  notes?: string | null;
};
