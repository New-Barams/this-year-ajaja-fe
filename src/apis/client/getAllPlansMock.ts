import { DOMAIN } from '@/constants/api';
import { GetAllPlansResponse } from '@/types/apis/plan/GetAllPlans';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const getAllPlansMock = async () => {
  const { data } = await axiosInstanceClient.get<GetAllPlansResponse>(
    DOMAIN.GET_PLANS_ALL,
    {
      authorization: false,
    },
  );
  return data;
};
