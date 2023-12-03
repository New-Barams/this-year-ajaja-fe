import { postAjaja } from '@/apis/client/postAjaja';
import { useMutation } from '@tanstack/react-query';

export const usePostAjajaMutation = () => {
  return useMutation({
    mutationFn: postAjaja,
    throwOnError: true,
  });
};
