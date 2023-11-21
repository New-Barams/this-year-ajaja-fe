import { DOMAIN } from '@/constants/api';
import { axiosInstanceClient } from '../axiosInstanceClient';

// 헤더에 date 추가해줘야 함
export const editPlan = (planId: number) => {
  return axiosInstanceClient.put(DOMAIN.PUT_PLANS(planId));
};
