import { GetAllPlansResponse } from '@/types/apis/plan/GetAllPlans';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const getAllPlans = async () => {
  const { data } = await axiosInstanceClient.get<GetAllPlansResponse>(
    '/plans',
    {
      authorization: false,
    },
  );
  return data;
};
