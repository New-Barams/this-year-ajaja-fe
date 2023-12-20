import { DOMAIN } from '@/constants/api';
import { GetRemindResponse } from '@/types/apis/remind/getRemind';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const getRemindSeason = async (
  planId: number,
): Promise<GetRemindResponse> => {
  const { data } = await axiosInstanceClient.get(DOMAIN.GET_REMINDS(planId));
  return data;
};
