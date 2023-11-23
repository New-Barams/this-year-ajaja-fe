import { DOMAIN } from '@/constants/api';
import {
  getTokenWithCodeRequestBody,
  getTokenWithCodeResponse,
} from '@/types/apis/users/GetTokenWithCoin';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const getTokenWithCode = async (code: string) => {
  const requestBody: getTokenWithCodeRequestBody = {
    authorizationCode: code,
    redirectUrl: `${process.env.NEXT_PUBLIC_REDIRECT_URL}`,
  };
  const { data } = await axiosInstanceClient.post<getTokenWithCodeResponse>(
    DOMAIN.POST_LOGIN,
    requestBody,
    {
      authorization: false,
    },
  );
  return data;
};
