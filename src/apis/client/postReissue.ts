import { DOMAIN } from '@/constants/api';
import { Token } from '@/types/apis/users/PostReissue';
import { axiosInstanceClient } from '@apis/axiosInstanceClient';

export const postReissue = (token: Token) => {
  return axiosInstanceClient.post(DOMAIN.POST_REISSUE, token, {
    authorization: false,
  });
};
