import { DOMAIN } from '@/constants/api';
import { GetPlansResponse } from '@/types/apis/plan/GetPlans';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const getPlans = (id: number) => {
  return axiosInstanceClient.get<GetPlansResponse>(DOMAIN.GET_PLANS(id));
};
