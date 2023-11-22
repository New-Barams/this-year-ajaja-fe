import { axiosInstanceClient } from '@/apis/axiosInstanceClient';
import { getTokenWithCodeResponse } from '@/types/apis/users/getTokenWithCoin';

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
