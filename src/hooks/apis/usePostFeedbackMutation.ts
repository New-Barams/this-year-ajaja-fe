import { postFeedback } from '@/apis/client/postFeedback';
import { ajajaToast } from '@/components/Toaster/customToast';
import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostFeedbackMutation = (planId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postFeedback,
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.MY_PLANS],
        }),
        queryClient.invalidateQueries({
          queryKey: [{ planId: planId }, QUERY_KEY.REMIND],
        }),
      ]);
      ajajaToast.success('피드백 완료');
    },
    onError: () => {
      ajajaToast.error('피드백 실패');
    },
    throwOnError: true,
  });
};
