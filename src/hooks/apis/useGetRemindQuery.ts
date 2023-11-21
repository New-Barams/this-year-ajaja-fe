import { getRemindAfterSeason } from '@/apis/client/getRemindAfterSeason';
import { getRemindSeason } from '@/apis/client/getRemindSeason';
import { useQuery } from '@tanstack/react-query';

export const useGetRemindQuery = (planId: number, isSeason: boolean) => {
  return useQuery({
    queryKey: ['getRemind', planId], // plan 마다 캐시 관리 ?
    queryFn: () => {
      return isSeason ? getRemindSeason(planId) : getRemindAfterSeason(planId);
    },
  });
};