import { postNewPlan } from '@/apis/client/postNewPlan';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostNewPlanMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postNewPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getMyPlans'],
      }); // getMyPlans 쿼리(홈 페이지) 무효화
    },
  });
};
