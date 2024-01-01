import { DOMAIN } from '@/constants/api';
import { PostNewPlanRequestBody } from '@/types/apis/plan/PostNewPlan';
import { currentMonth } from '@/utils/currentMonth';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const postNewPlan = async (body: PostNewPlanRequestBody) => {
  const { data } = await axiosInstanceClient.post(
    DOMAIN.POST_PLANS,
    {
      ...body,
    },
    {
      headers: { Month: currentMonth() },
    },
  );
  return data;
};
