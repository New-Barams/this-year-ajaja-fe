import { DOMAIN } from '@/constants/api';
import { getTokenWithCodeResponse } from '@/types/apis/users/GetTokenWithCoin';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const getTokenWithCode = async (code: string) => {
  const { data } = await axiosInstanceClient.post<getTokenWithCodeResponse>(
    DOMAIN.POST_LOGIN(code),
    null,
    {
      authorization: false,
    },
  );
  return data;
};
