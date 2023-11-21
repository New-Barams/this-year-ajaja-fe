import { DOMAIN } from '@/constants/api';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const getRemindAfterSeason = (planId: number) => {
  return axiosInstanceClient.get(DOMAIN.GET_REMINDS(planId));
};
