'use client';

import { getMyPlans } from '@/apis/client/getMyPlans';
import { QUERY_KEY } from '@/constants/queryKey';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetMyPlansQuery = () => {
  const { data } = useSuspenseQuery({
    queryKey: [QUERY_KEY.MY_PLANS],
    queryFn: getMyPlans,
    staleTime: Infinity,
  });
  return { myPlans: data! };
};
