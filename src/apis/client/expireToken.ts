import { axiosInstanceClient } from '@/apis/axiosInstanceClient';
import { DOMAIN } from '@/constants/api';

export const expireToken = () => {
  return axiosInstanceClient.post(DOMAIN.POST_USERS_LOGOUT);
};
