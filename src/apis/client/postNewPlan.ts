import { DOMAIN } from '@/constants/api';
import { PostNewPlanRequestBody } from '@/types/apis/plan/PostNewPlan';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const postNewPlan = async (body: PostNewPlanRequestBody) => {
  const { data } = await axiosInstanceClient.post(
    DOMAIN.POST_PLANS,
    {
      ...body,
    },
    {
      headers: { Month: 1 }, // TODO: Month: currentMonth()로 바꿔줘야 함
    },
  );
  return data;
};
