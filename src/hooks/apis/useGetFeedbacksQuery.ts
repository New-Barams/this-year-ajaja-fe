'use client';

import { getFeedbacks } from '@/apis/client/getFeedbacks';
import { QUERY_KEY } from '@/constants';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetFeedbacksQuery = (planId: number) => {
  const { data } = useSuspenseQuery({
    queryKey: [{ planId: planId }, QUERY_KEY.FEEDBACKS],
    queryFn: () => getFeedbacks(planId),
    staleTime: Infinity,
  });
  return { feedback: data!.data };
};
