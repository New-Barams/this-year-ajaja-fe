import { deletePlan } from '@/apis/client/deletePlan';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeletePlanMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePlan,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MY_PLANS],
      });
    },
  });
};
