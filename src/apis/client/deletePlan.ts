import { DOMAIN } from '@/constants/api';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const deletePlan = (planId: number) => {
  return axiosInstanceClient.delete(DOMAIN.DELETE_PLANS(planId), {
    headers: { Month: 1 }, // TODO: Month: currentMonth()로 바꿔줘야 함
  });
};
