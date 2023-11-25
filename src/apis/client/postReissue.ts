import { DOMAIN } from '@/constants/api';
import { getCookie } from 'cookies-next';
import { axiosInstanceClient } from '@apis/axiosInstanceClient';

export const postReissue = () => {
  const reissueRequestBody = getCookie('auth');
  return axiosInstanceClient.post(DOMAIN.POST_REISSUE, reissueRequestBody, {
    authorization: false,
  });
};
