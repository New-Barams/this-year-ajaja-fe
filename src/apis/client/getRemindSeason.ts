import { DOMAIN } from '@/constants/api';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const getRemindSeason = (planId: number) => {
  return axiosInstanceClient.get(DOMAIN.GET_REMINDS_MODIFY(planId));
};
