import { auth } from '@/stores/authStore';

export interface getTokenWithCodeResponse {
  success: boolean;
  data: auth;
}
