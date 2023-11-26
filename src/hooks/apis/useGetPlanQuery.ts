import { getPlan } from '@/apis/client/getPlan';
import { useQuery } from '@tanstack/react-query';

export const useGetPlanQuery = (id: number) => {
  const { data, isFetching, isError } = useQuery({
    queryKey: [{ planId: id }, 'getPlan'],
    queryFn: () => getPlan(id),
  });
  return { plan: data!.data, isFetching, isError };
};
