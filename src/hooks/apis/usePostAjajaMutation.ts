import { postAjaja } from '@/apis/client/postAaja';
import { useMutation } from '@tanstack/react-query';

export const usePostAjajaMutation = () => {
  return useMutation({
    mutationFn: postAjaja,
  });
};
