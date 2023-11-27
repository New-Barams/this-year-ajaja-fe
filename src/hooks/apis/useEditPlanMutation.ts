import { editPlan } from '@/apis/client/editPlan';
import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useEditPlanMutation = (planId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [{ planId: planId }],
      }); // planId에 해당하는 getPlan 쿼리, getRemind 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MY_PLANS],
      }); // getMyPlans 쿼리(홈 페이지) 무효화
    },
  });
};
