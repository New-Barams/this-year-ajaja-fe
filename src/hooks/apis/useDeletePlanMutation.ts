import { deletePlan } from '@/apis/client/deletePlan';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeletePlanMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePlan,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getMyPlans'],
      }); // getMyPlans 쿼리(홈 페이지) 무효화
    },
  });
};
