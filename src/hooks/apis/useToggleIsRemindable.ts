import { toggleIsRemindable } from '@/apis/client/toggleIsRemindable';
import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useToggleIsRemindableMutation = (planId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleIsRemindable,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [{ planId: planId }, QUERY_KEY.REMIND],
      });
    },
    throwOnError: true,
  });
};
