import { getRemindAfterSeason } from '@/apis/client/getRemindAfterSeason';
import { getRemindSeason } from '@/apis/client/getRemindSeason';
import { useQuery } from '@tanstack/react-query';

export const useGetRemindQuery = (planId: number, isSeason: boolean) => {
  const { data } = useQuery({
    queryKey: [{ planId: planId }, 'getRemind', { isSeason: isSeason }],
    queryFn: () => {
      return isSeason ? getRemindSeason(planId) : getRemindAfterSeason(planId);
    },
    staleTime: 300000, // TODO: 최대한 길게 해도 될 것 같음
  });

  return { remindData: data!.data };
};
