import { DOMAIN } from '@/constants/api';
import { PostFeedbackRequest } from '@/types/apis/feedback/PostFeedbaks';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const postFeedback = async ({
  feedbackId,
  body,
}: PostFeedbackRequest) => {
  const { data } = await axiosInstanceClient.post(
    DOMAIN.POST_FEEDBACKS(feedbackId),
    {
      ...body,
    },
  );
  return data;
};
