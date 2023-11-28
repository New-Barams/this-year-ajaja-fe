import { postFeedback } from '@/apis/client/postFeedback';
import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostFeedbackMutation = (planId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MY_PLANS],
      });
      queryClient.invalidateQueries({
        queryKey: [{ planId: planId }, QUERY_KEY.REMIND],
      });
    },
    throwOnError: true,
  });
};
