import { postNewPlan } from '@/apis/client/postNewPlan';
import { ajajaToast } from '@/components/Toaster/customToast';
import { QUERY_KEY } from '@/constants/queryKey';
import { clearCreatePlanSessionData } from '@/utils/clearCreatePlanSessionData';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostNewPlanMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postNewPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MY_PLANS],
      });
      ajajaToast.success('계획 생성 완료');
      clearCreatePlanSessionData();
    },
    onError: () => {
      ajajaToast.error('계획 생성 실패');
    },
  });
};
