import { toggleAjajaNotification } from '@/apis/client/toggleAjajaNotification';
import { QUERY_KEY } from '@/constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useToggleAjajaNotificationMutation = (planId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleAjajaNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [{ planId: planId }, QUERY_KEY.PLAN],
      });
    },
  });
};
