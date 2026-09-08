import { http } from "@/api/http";
import type { Company } from "@/types/companies";

export function getCompaniesAPI() {
  return http.get<Company[]>("/companies");
}

export function getCompanyAPI(companyId: string) {
  return http.get<Company>(`/companies/${companyId}`);
}
