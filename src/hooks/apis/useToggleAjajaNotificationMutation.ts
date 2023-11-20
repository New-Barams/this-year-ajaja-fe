import { toggleAjajaNotification } from '@/apis/client/toggleAjajaNotification';
import { useMutation } from '@tanstack/react-query';

export const useToggleAjajaNotificationMutation = () => {
  return useMutation({
    mutationFn: toggleAjajaNotification,
  });
};

// onSuccess 옵션에 계획 조회하는 useQuery의 key를 invalidate 해서 refetch 하도록 ?
