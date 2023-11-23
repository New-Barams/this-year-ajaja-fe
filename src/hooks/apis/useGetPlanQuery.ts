import { getPlan } from '@/apis/client/getPlan';
import { useQuery } from '@tanstack/react-query';

export const useGetPlanQuery = (id: number) => {
  const { data, isFetching, isError } = useQuery({
    queryKey: ['plan'],
    queryFn: () => getPlan(id),
  });
  return { Plan: data!.data, isFetching, isError };
};
