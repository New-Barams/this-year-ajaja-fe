import { axiosInstanceClient } from '@/apis/axiosInstanceClient';
import { DOMAIN } from '@/constants/api';
import { GetPlanResponse } from '@/types/apis/plan/GetPlan';

export const getPlan = async (id: number) => {
  const { data } = await axiosInstanceClient.get<GetPlanResponse>(
    DOMAIN.GET_PLANS(id),
  );

  return data;
};
