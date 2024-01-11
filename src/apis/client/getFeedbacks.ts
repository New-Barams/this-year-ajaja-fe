import { DOMAIN } from '@/constants/api';
import { GetFeedbacksResponse } from '@/types/apis/feedback/GetFeedbacks';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const getFeedbacks = async (planId: number) => {
  const { data } = await axiosInstanceClient.get<GetFeedbacksResponse>(
    DOMAIN.GET_FEEDBACKS(planId),
    {
      params: {
        planId,
      },
    },
  );
  return data;
};
