import { toggleIsRemindable } from '@/apis/client/toggleIsRemindable';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useToggleIsRemindableMutation = (planId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleIsRemindable,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [{ planId: planId }, 'getRemind'],
      }); // TODO: planId에 해당하는  getRemind 쿼리 무효화 => 안 하는게 좋을 지도 ?
    },
  });
};
