import { DOMAIN } from '@/constants/api';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const toggleAjajaNotification = (planId: number) => {
  return axiosInstanceClient.put(DOMAIN.PUT_PLANS_SWITCH_AJAJA(planId));
};
