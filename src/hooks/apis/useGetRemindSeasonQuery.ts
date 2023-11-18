import { getRemindSeason } from '@/apis/client/getRemindSeason';
import { useQuery } from '@tanstack/react-query';

export const useGetRemindSeasonQuery = (planId: number) => {
  return useQuery({
    queryKey: ['getRemindSeason'],
    queryFn: () => {
      return getRemindSeason(planId);
    },
  });
};
