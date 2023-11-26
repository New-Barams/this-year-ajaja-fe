import { DOMAIN } from '@/constants/api';
import { axiosInstanceClient } from '@apis/axiosInstanceClient';

export const postVerify = async (code: string) => {
  const requestBody = { certification: code };
  return await axiosInstanceClient
    .post(DOMAIN.POST_USERS_VERIFY, requestBody)
    .catch((error) => {
      console.log(error);
      //TODO 에러번호로 확인 후 그외 번호는 그냥 넘기기
      const errorMessage = error.response.data.errorMessage;
      throw new Error(errorMessage);
    });
};
