import { auth } from '@/stores/authStore';

export interface getTokenWithCodeResponse {
  success: boolean;
  data: auth;
}

export interface getTokenWithCodeRequestBody {
  authorizationCode: string;
  redirectUrl: string;
}
