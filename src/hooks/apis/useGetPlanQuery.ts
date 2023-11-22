import { getPlan } from '@/apis/client/getPlan';
import { useQuery } from '@tanstack/react-query';

export const useGetPlanQuery = (id: number) => {
  return useQuery({ queryKey: ['plan'], queryFn: () => getPlan(id) });
};
