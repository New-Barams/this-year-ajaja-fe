import { DOMAIN } from '@/constants/api';
import { PostSendVerificationRequestBody } from '@/types/apis/users/PostSendVerification';
import { axiosInstanceClient } from '@apis/axiosInstanceClient';

export const postSendVerification = async (email: string) => {
  const data: PostSendVerificationRequestBody = { email: email };
  return await axiosInstanceClient.post(
    DOMAIN.POST_USERS_SEND_VERIFICATION,
    data,
  );
};
