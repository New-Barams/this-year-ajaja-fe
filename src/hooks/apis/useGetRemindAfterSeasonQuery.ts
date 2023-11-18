import { getRemindAfterSeason } from '@/apis/client/getRemindAfterSeason';
import { useQuery } from '@tanstack/react-query';

export const useGetRemindAfterSeasonQuery = (planId: number) => {
  return useQuery({
    queryKey: ['getRemindAfterSeason'],
    queryFn: () => {
      return getRemindAfterSeason(planId);
    },
  });
};
