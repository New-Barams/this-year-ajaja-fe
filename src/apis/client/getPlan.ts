import { axiosInstanceClient } from '@/apis/axiosInstanceClient';
import { DOMAIN } from '@/constants/api';
import { GetPlanResponse } from '@/types/apis/plan/GetPlan';

export const getPlan = async (id: number, isLogin: boolean = false) => {
  const { data } = await axiosInstanceClient.get<GetPlanResponse>(
    DOMAIN.GET_PLANS(id),
    { authorization: isLogin },
  );

  return data;
};
