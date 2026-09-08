import { http } from "@/api/http";
import type { Company, UpdateCompanyRequest } from "@/types/companies";

export function getCompaniesAPI() {
  return http.get<Company[]>("/companies");
}

export function getCompanyAPI(companyId: string) {
  return http.get<Company>(`/companies/${companyId}`);
}

export function updateCompanyAPI(companyId: string, data: UpdateCompanyRequest) {
  return http.patch<Company>(`/companies/${companyId}`, data);
}
