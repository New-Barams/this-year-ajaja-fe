import { DOMAIN } from '@/constants/api';
import { currentMonth } from '@/utils/currentMonth';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const deletePlan = (planId: number) => {
  return axiosInstanceClient.delete(DOMAIN.DELETE_PLANS(planId), {
    headers: { Month: currentMonth() },
  });
};
