import { editRemind } from '@/apis/client/editRemind';
import { ajajaToast } from '@/components/Toaster/customToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useEditRemindMutation = (planId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editRemind,
    onSuccess: () => {
      Promise.all([
        // TODO: 쿼리 무효화는 더 고민해보기
        queryClient.invalidateQueries({
          queryKey: [{ planId: planId }],
        }),
      ]);
      ajajaToast.success('계획 수정 완료');
    },
    onError: () => {
      ajajaToast.error('계획 수정 실패');
    },
    throwOnError: true,
  });
};
