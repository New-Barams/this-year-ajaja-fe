import { postFeedback } from '@/apis/client/postFeedback';
import { useMutation } from '@tanstack/react-query';

export const usePostFeedbackMutation = () => {
  return useMutation({
    mutationFn: postFeedback,
  });
};
