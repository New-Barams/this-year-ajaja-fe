import { axiosInstanceClient } from '@/apis/axiosInstanceClient';
import { DOMAIN } from '@/constants/api';
import { GetPlanResponse } from '@/types/apis/plan/GetPlan';

export const getPlan = (id: number) => {
  return axiosInstanceClient.get<GetPlanResponse>(DOMAIN.GET_PLANS(id));
};
