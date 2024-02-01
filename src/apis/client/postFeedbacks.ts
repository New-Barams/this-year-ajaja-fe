import { DOMAIN } from '@/constants';
import { PostFeedbacksRequest } from '@/types/apis/feedback/PostFeedbacks';
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
