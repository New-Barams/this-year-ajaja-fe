'use client';

import { getAllPlans } from '@/apis/client/getAllPlans';
import { GetAllPlansRequestQuery } from '@/types/apis/plan/GetAllPlans';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useAllPlansQuery = (query: GetAllPlansRequestQuery) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['getAllPlans', query.sortCondition, query.isNewYear],
      queryFn: async ({ pageParam }) => {
        let params = {
          sortCondition: query.sortCondition,
          isNewYear: query.isNewYear,
          pageSize: query.pageSize,
        };

        if (pageParam) {
          params = { ...params, ...pageParam };
        }
        const result = await getAllPlans(params);
        return result?.data;
      },
      initialPageParam: {},
      getNextPageParam: (lastPage) => {
        const lastItem = lastPage[lastPage.length - 1];
        return lastItem
          ? { cursorCreatedAt: lastItem.createdAt, cursorId: lastItem.id }
          : undefined;
      },
      staleTime: 10000,
    });
  console.log('Data:', data?.pages);
  return {
    loadedPlans: data?.pages || [],
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  };
};
