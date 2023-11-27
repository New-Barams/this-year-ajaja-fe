import { postNewPlan } from '@/apis/client/postNewPlan';
import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostNewPlanMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postNewPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MY_PLANS],
      });
    },
  });
};
