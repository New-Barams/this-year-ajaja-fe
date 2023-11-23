import { DOMAIN } from '@/constants/api';
import { GetMyPlansResponse } from '@/types/apis/plan/GetMyPlans';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const getMyPlans = async () => {
  const { data } = await axiosInstanceClient.get<GetMyPlansResponse>(
    DOMAIN.GET_PLANS_MAIN,
  );
  return data;
};
