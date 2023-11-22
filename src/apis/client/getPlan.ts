import { DOMAIN } from '@/constants/api';
import { GetPlanResponse } from '@/types/apis/plan/GetPlans';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const getPlan = (id: number) => {
  return axiosInstanceClient.get<GetPlanResponse>(DOMAIN.GET_PLANS(id));
};
