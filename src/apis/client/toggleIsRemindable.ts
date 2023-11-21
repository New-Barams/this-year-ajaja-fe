import { DOMAIN } from '@/constants/api';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const toggleIsRemindable = (planId: number) => {
  return axiosInstanceClient.put(DOMAIN.PUT_PLANS_SWITCH_REMINDABLE(planId));
};
