export type JobStatus =
  | "WISHLIST"
  | "APPLIED"
  | "DOCUMENT_SCREENING"
  | "FIRST_INTERVIEW"
  | "SECOND_INTERVIEW"
  | "THIRD_INTERVIEW"
  | "FINAL_INTERVIEW"
  | "OFFER"
  | "REJECTED"
  | "WITHDRAWN";

export type EmploymentType =
  | "FULL_TIME"
  | "CONTRACT"
  | "DISPATCH"
  | "FREELANCE"
  | "PART_TIME";

export type WorkMode = "ONSITE" | "REMOTE" | "HYBRID" | "FLEXIBLE";

export type JobCompany = {
  id: string;
  name: string;
};

export type Job = {
  id: string;
  companyId: string;
  positionName: string;
  platform: string;
  location: string | null;
  salaryCurrency: string;
  matchScore: number | null;
  url: string | null;
  status: JobStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  company: JobCompany;

  employmentType: EmploymentType;
  hiringCount: number | null;
  workMode: WorkMode;

  annualSalaryMin: number | null;
  annualSalaryMax: number | null;
  monthlySalaryMin: number | null;
  monthlySalaryMax: number | null;
  hourlySalaryMin: number | null;
  hourlySalaryMax: number | null;

  includesFixedOvertime: boolean;
  fixedOvertimeHours: number | null;
  fixedOvertimeAmount: number | null;

  description: string | null;
  applicationRequirements: string | null;
  preferredQualifications: string | null;
  selectionProcess: string | null;
  workLocationDetails: string | null;
  workingHours: string | null;
  benefits: string | null;
  holidays: string | null;
  teamEnvironment: string | null;

  requiredSkills: string[];
  bonusSkills: string[];
};

export type CreateJobRequest = {
  companyId?: string;
  companyName?: string;
  positionName: string;
  platform: string;
  employmentType?: EmploymentType;
  hiringCount?: number;
  workMode?: WorkMode;
  location?: string;
  annualSalaryMin?: number;
  annualSalaryMax?: number;
  monthlySalaryMin?: number;
  monthlySalaryMax?: number;
  hourlySalaryMin?: number;
  hourlySalaryMax?: number;
  salaryCurrency?: string;
  includesFixedOvertime?: boolean;
  fixedOvertimeHours?: number;
  fixedOvertimeAmount?: number;
  description?: string;
  applicationRequirements?: string;
  preferredQualifications?: string;
  selectionProcess?: string;
  workLocationDetails?: string;
  workingHours?: string;
  benefits?: string;
  holidays?: string;
  teamEnvironment?: string;
  requiredSkills?: string[];
  bonusSkills?: string[];
  url?: string;
  status?: JobStatus;
  notes?: string;
};

export type UpdateJobRequest = Partial<CreateJobRequest>;
