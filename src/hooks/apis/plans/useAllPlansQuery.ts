'use client';

import { getAllPlans } from '@/apis/client/getAllPlans';
import { QUERY_KEY } from '@/constants/queryKey';
import { GetAllPlansRequestQuery } from '@/types/apis/plan/GetAllPlans';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useAllPlansQuery = (query: GetAllPlansRequestQuery) => {
  const { data } = useSuspenseQuery({
    queryKey: [QUERY_KEY.ALL_PLANS, query.sortCondition, query.isNewYear],
    queryFn: () => getAllPlans(query),
    staleTime: 10000,
  });
  return { allPlans: data! };
};
