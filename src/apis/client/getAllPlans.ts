import { DOMAIN } from '@/constants/api';
import {
  GetAllPlansRequestQuery,
  GetAllPlansResponse,
} from '@/types/apis/plan/GetAllPlans';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const getAllPlans = async (query: GetAllPlansRequestQuery) => {
  const { data } = await axiosInstanceClient.get<GetAllPlansResponse>(
    DOMAIN.GET_PLANS_ALL,
    {
      authorization: true,
      params: {
        ...query,
      },
    },
  );
  return data;
};
