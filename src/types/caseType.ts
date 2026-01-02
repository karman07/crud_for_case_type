export interface CaseType {
  id?: number;
  caseTypeCode: string;
  caseTypeName: string;
  caseType: string;
  isActive: string;
  userName: string;
  loginId?: string | null;
}

export interface ApiResponse {
  caseTypeCode?: string;
  message: string;
  statusCode: string;
}