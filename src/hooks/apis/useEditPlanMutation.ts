import { editPlan } from '@/apis/client/editPlan';
import { ajajaToast } from '@/components/Toaster/customToast';
import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useEditPlanMutation = (planId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editPlan,
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: [{ planId: planId }],
        }),
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.MY_PLANS],
        }),
      ]);
      ajajaToast.success('계획 수정 완료');
    },
    throwOnError: true,
  });
};
