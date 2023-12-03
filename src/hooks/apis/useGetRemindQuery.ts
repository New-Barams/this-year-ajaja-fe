import { getRemindAfterSeason } from '@/apis/client/getRemindAfterSeason';
import { getRemindSeason } from '@/apis/client/getRemindSeason';
import { QUERY_KEY } from '@/constants/queryKey';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetRemindQuery = (planId: number, isSeason: boolean) => {
  const { data } = useSuspenseQuery({
    queryKey: [{ planId: planId }, QUERY_KEY.REMIND, { isSeason: isSeason }],
    queryFn: () => {
      return isSeason ? getRemindSeason(planId) : getRemindAfterSeason(planId);
    },
    staleTime: Infinity,
  });

  return { remindData: data!.data };
};
