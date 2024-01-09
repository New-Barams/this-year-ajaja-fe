import { postFeedbacks } from '@/apis/client/postFeedbacks';
import { ajajaToast } from '@/components/Toaster/customToast';
import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const usePostFeedbacksMutation = (planId: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postFeedbacks,
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.MY_PLANS],
        }),
        queryClient.invalidateQueries({
          queryKey: [{ planId: planId }, QUERY_KEY.FEEDBACKS],
        }),
      ]);
      ajajaToast.success('피드백 완료');
      router.push(`/feedback/${planId}`);
    },
    onError: () => {
      ajajaToast.error('피드백 실패');
      return '에러!';
    },
  });
};
