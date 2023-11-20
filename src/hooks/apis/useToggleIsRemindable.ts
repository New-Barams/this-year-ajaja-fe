import { toggleIsRemindable } from '@/apis/client/toggleIsRemindable';
import { useMutation } from '@tanstack/react-query';

export const useToggleIsRemindableMutation = () => {
  return useMutation({
    mutationFn: toggleIsRemindable,
  });
};
