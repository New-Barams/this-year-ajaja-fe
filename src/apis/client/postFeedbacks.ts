import { DOMAIN } from '@/constants';
import { PostFeedbacksRequest } from '@/types/apis/feedback/PostFeedbaks';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const postFeedbacks = async ({ planId, body }: PostFeedbacksRequest) => {
  const { data } = await axiosInstanceClient.post(
    DOMAIN.POST_FEEDBACKS(planId),
    {
      ...body,
    },
  );
  return data;
};
