
import axios from 'axios';
import { CaseType, ApiResponse } from '@/types/caseType';

const OAUTH_URL = process.env.NEXT_PUBLIC_OAUTH_URL!;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET!;
const TOKEN_URL = process.env.NEXT_PUBLIC_TOKEN_URL!;

export const getToken = async (): Promise<string> => {
  try {
    const tokenResponse = await axios.post(OAUTH_URL, {
      tokenUrl: TOKEN_URL,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET
    });

    if (tokenResponse.data?.access_token) {
      console.log('Generated new access token');
      return tokenResponse.data.access_token;
    }

    console.warn('OAuth token generation failed, using fallback token');
    return 'KNRzh3Hpw8hTe666_taBkA';
  } catch (error) {
    console.error('Token generation failed:', error);
    return 'KNRzh3Hpw8hTe666_taBkA';
  }
};

const toApiPayload = (caseType: CaseType) => ({
  id: caseType.id,
  caseTypeCode: caseType.caseTypeCode,
  caseTypeName: caseType.caseTypeName,
  caseType: caseType.caseType,
  isActive: caseType.isActive,
  userName: caseType.userName,
  loginId: caseType.loginId
});

const fromApiItem = (item: any): CaseType => ({
  id: item.id,
  caseTypeCode: item.case_type_code || '',
  caseTypeName: item.case_type_name || '',
  caseType: item.case_type || '',
  isActive: item.is_active || 'A',
  userName: item.created_by || item.last_updated_by || '',
  loginId: null
});

export const createCaseType = async (caseType: CaseType): Promise<ApiResponse> => {
  const token = await getToken();
  const payload = toApiPayload(caseType);
  const response = await axios.post(API_BASE_URL, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

export const updateCaseType = async (caseType: CaseType): Promise<ApiResponse> => {
  const token = await getToken();
  const payload = toApiPayload(caseType);
  const response = await axios.post(API_BASE_URL, payload, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getCaseTypes = async (page: number = 1, pageSize: number = 10): Promise<{ items: CaseType[]; totalPages: number; currentPage: number; hasMore: boolean; totalCount: number }> => {
  const token = await getToken();
  const offset = (page - 1) * pageSize;
  const response = await axios.get(`${API_BASE_URL}?offset=${offset}&limit=${pageSize}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = response.data;
  const items = data?.items || [];
  const totalCount = data?.count || 0;
  const hasMore = data?.hasMore || false;
  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    items: Array.isArray(items) ? items.map(fromApiItem) : [],
    totalPages,
    currentPage: page,
    hasMore,
    totalCount
  };
};

export const deleteCaseType = async (caseTypeId: number): Promise<ApiResponse> => {
  const token = await getToken();
  const response = await axios.delete(`${API_BASE_URL}?caseTypeId=${caseTypeId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
