import { DOMAIN } from '@/constants/api';
import {
  PostLoginRequestBody,
  PostLoginResponse,
} from '@/types/apis/users/GetTokenWithCoin';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const postLogin = async (code: string) => {
  const requestBody: PostLoginRequestBody = {
    authorizationCode: code,
    redirectUri: `${process.env.NEXT_PUBLIC_REDIRECT_URL}?way=login`,
  };
  const { data } = await axiosInstanceClient.post<PostLoginResponse>(
    DOMAIN.POST_LOGIN,
    requestBody,
    {
      authorization: false,
    },
  );
  return data;
};
