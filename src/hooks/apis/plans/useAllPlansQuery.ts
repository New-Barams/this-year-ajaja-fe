'use client';

import { getAllPlans } from '@/apis/client/getAllPlans';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useAllPlansQuery = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['all_plans'],
    queryFn: getAllPlans,
    staleTime: 10000,
  });
  return { allPlans: data! };
};
