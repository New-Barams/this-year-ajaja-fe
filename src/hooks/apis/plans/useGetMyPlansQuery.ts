'use client';

import { getMyPlans } from '@/apis/client/getMyPlans';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetMyPlansQuery = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['getMyPlans'],
    queryFn: getMyPlans,
    staleTime: 10000,
  });
  return { myPlans: data! };
};
