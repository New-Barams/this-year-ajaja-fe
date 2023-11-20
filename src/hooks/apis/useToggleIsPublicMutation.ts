import { toggleIsPublic } from '@/apis/client/toggleIsPublic';
import { useMutation } from '@tanstack/react-query';

export const useToggleIsPublicMutation = () => {
  return useMutation({
    mutationFn: toggleIsPublic,
  });
};
