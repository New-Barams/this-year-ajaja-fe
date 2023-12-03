import { toggleIsPublic } from '@/apis/client/toggleIsPublic';
import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useToggleIsPublicMutation = (planId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleIsPublic,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [{ planId: planId }, QUERY_KEY.PLAN],
      });
    },
    throwOnError: true,
  });
};
