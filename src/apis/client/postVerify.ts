import { DOMAIN } from '@/constants/api';
import { axiosInstanceClient } from '@apis/axiosInstanceClient';

export const postVerify = async (code: string) => {
  const requestBody = { certification: code };
  return await axiosInstanceClient.post(DOMAIN.POST_USERS_VERIFY, requestBody);
};
