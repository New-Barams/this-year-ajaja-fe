import { DOMAIN } from '@/constants/api';
import { axiosInstanceClient } from '@apis/axiosInstanceClient';

export const submitEmailVerificationCode = async (code: string) => {
  const requestBody = { certification: code };
  const { data } = await axiosInstanceClient.post(
    DOMAIN.POST_USERS_VERIFY,
    requestBody,
  );

  return { data };
};
