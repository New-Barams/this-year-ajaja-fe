'use client';

import { getMyPlans } from '@/apis/client/getMyPlans';
import { QUERY_KEY } from '@/constants/queryKey';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetMyPlansQuery = () => {
  const { data } = useSuspenseQuery({
    queryKey: [QUERY_KEY.MY_PLANS],
    queryFn: getMyPlans,
    staleTime: 10000,
  });
  return { myPlans: data! };
};
