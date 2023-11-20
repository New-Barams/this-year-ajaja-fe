import { DOMAIN } from '@/constants/api';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const toggleIsPublic = (planId: number) => {
  return axiosInstanceClient.put(DOMAIN.PUT_PLANS_SWITCH_PUBLIC(planId));
};
