import { DOMAIN } from '@/constants/api';
import { PostNewPlanRequestBody } from '@/types/apis/plan/PostNewPlan';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const postNewPlan = async (body: PostNewPlanRequestBody) => {
  const { data } = await axiosInstanceClient.post(DOMAIN.POST_PLANS, {
    data: body,
  });
  return data;
};
