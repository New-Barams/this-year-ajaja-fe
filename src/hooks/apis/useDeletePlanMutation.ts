import { deletePlan } from '@/apis/client/deletePlan';
import { ajajaToast } from '@/components/Toaster/customToast';
import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeletePlanMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePlan,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MY_PLANS],
      });
      ajajaToast.success('계획 삭제 완료');
    },
    throwOnError: true,
  });
};
