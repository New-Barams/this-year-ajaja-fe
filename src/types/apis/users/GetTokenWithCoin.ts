import { auth } from '@/stores/authStore';

export interface PostLoginResponse {
  success: boolean;
  data: auth;
}

export interface PostLoginRequestBody {
  authorizationCode: string;
  redirectUrl: string;
}
