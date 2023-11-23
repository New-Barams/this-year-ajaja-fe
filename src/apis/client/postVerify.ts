import { DOMAIN } from '@/constants/api';
import { axiosInstanceClient } from '@apis/axiosInstanceClient';

export const postVerify = async (code: string) => {
  const requestBody = { certification: code };
  return axiosInstanceClient
    .post(DOMAIN.POST_USERS_VERIFY, requestBody)
    .catch((error) => {
      console.log(error);
      const errorMessage = error.response.data.errorMessage;
      throw new Error(errorMessage);
    });
};
