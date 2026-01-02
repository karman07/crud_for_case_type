
import axios from 'axios';
import { CaseType, ApiResponse } from '@/types/caseType';

const OAUTH_URL = 'https://intellinum-oauth-proxy.vercel.app/';
const API_BASE_URL = 'https://g4b9bc24e36abdb-atpintellinum.adb.us-ashburn-1.oraclecloudapps.com/ords/krusteaz_quality_dev/quality/case-types';

const CLIENT_ID = 'VCeQqXIceSDz6MgdEofFsw..';
const CLIENT_SECRET = 'VZqiAO74pVb2Vs1xPxAE8g..';
const TOKEN_URL = 'https://g4b9bc24e36abdb-atpintellinum.adb.us-ashburn-1.oraclecloudapps.com/ords/krusteaz_quality_dev/oauth/token';

export const getToken = async (): Promise<string> => {
  // Use the static token as per the working curl example
  return 'KNRzh3Hpw8hTe666_taBkA';
};

const toApiPayload = (caseType: CaseType) => ({
  id: caseType.id,
  case_type_code: caseType.caseTypeCode,
  case_type_name: caseType.caseTypeName,
  case_type: caseType.caseType,
  is_active: caseType.isActive,
  user_name: caseType.userName,
  login_id: caseType.loginId
});

const fromApiItem = (item: any): CaseType => ({
  id: item.id,
  caseTypeCode: item.case_type_code || item.caseTypeCode || item.case_type_code || '',
  caseTypeName: item.case_type_name || item.caseTypeName || item.case_type_name || '',
  caseType: item.case_type || item.caseType || item.case_type || '',
  isActive: item.is_active || item.isActive || item.is_active || 'A',
  userName: item.created_by || item.user_name || item.userName || item.last_updated_by || '',
  loginId: item.login_id ?? null
});

export const createCaseType = async (caseType: CaseType): Promise<ApiResponse> => {
  const token = await getToken();
  const payload = toApiPayload(caseType);
  console.log('Creating case type with token:', token);
  console.log('Endpoint:', API_BASE_URL);
  console.log('Payload:', payload);
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
  console.log('Updating case type with token:', token);
  console.log('Endpoint:', API_BASE_URL);
  console.log('Payload:', payload);
  const response = await axios.post(API_BASE_URL, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

export const getCaseTypes = async (): Promise<CaseType[]> => {
  const token = await getToken();
  console.log('Getting case types with token:', token);
  console.log('Endpoint:', API_BASE_URL);
  const response = await axios.get(API_BASE_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = response.data;
  const items = data?.items || data;
  if (Array.isArray(items)) {
    return items.map(fromApiItem);
  }
  return [];
};

export const deleteCaseType = async (caseTypeId: number): Promise<ApiResponse> => {
  const token = await getToken();
  console.log('Deleting case type with token:', token);
  console.log('Endpoint:', `${API_BASE_URL}?caseTypeId=${caseTypeId}`);
  const response = await axios.delete(`${API_BASE_URL}?caseTypeId=${caseTypeId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
