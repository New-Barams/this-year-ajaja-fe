import { toggleAjajaNotification } from '@/apis/client/toggleAjajaNotification';
import { useMutation } from '@tanstack/react-query';

export const useToggleAjajaNotificationMutation = () => {
  return useMutation({
    mutationFn: toggleAjajaNotification,
  });
};
