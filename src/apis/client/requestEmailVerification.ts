import { DOMAIN } from '@/constants/api';
import {
  RequestEmailVerificationRequestBody,
  RequestEmailVerificationResponse,
} from '@/types/apis/users/RequestEmailVerification';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const requestEmailVerification = (email: string) => {
  const data: RequestEmailVerificationRequestBody = { email: email };
  const certification =
    axiosInstanceClient.post<RequestEmailVerificationResponse>(
      DOMAIN.POST_USERS_SEND_VERIFICATION,
      data,
    );
  return certification;
};
