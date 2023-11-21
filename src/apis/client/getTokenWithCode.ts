import { getTokenWithCodeResponse } from '@/types/apis/login/getTokenWithCoin';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const getTokenWithCode = async (code: string) => {
  const { data } = await axiosInstanceClient.post<getTokenWithCodeResponse>(
    `/login?code=${code}`,
    null,
    {
      authorization: false,
    },
  );
  return data;
};
