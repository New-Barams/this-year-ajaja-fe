'use client';

import { getAllPlans } from '@/apis/client/getAllPlans';
import { GetAllPlansRequestQuery } from '@/types/apis/plan/GetAllPlans';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useAllPlansQuery = (query: GetAllPlansRequestQuery) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['getAllPlans', query.sort, query.current],
      queryFn: async ({ pageParam = {} }) => {
        let params = {
          sort: query.sort,
          current: query.current,
        };

        if (pageParam) {
          params = { ...params, ...pageParam };
        }
        const result = await getAllPlans(params);
        return result?.data;
      },
      initialPageParam: {},
      getNextPageParam: (lastPage) => {
        // console.log('lastPage:', lastPage);
        const lastItem = lastPage[lastPage.length - 1];
        // if (lastItem) console.log(query.sort, lastItem.id, lastItem.ajajas);
        return lastItem
          ? query.sort === 'ajaja'
            ? { start: lastItem.id, ajaja: lastItem.ajajas }
            : { start: lastItem.id }
          : undefined;
      },
      staleTime: 10000,
    });
  // console.log('Data:', data?.pages);
  return {
    loadedPlans: data?.pages || [],
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  };
};
