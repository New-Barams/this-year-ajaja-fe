import { postSendVerification } from '@/apis/client/postSendVerification';
import { useMutation } from '@tanstack/react-query';

export const usePostSendVerificationMutation = () => {
  const {
    data,
    mutateAsync,
    isError,
    isSuccess,
    error,
    failureReason,
    isPending,
  } = useMutation({
    mutationFn: (email: string) => postSendVerification(email),
  });
  return {
    failureReason,
    data,
    mutateAsync,
    isPending,
    isSuccess,
    isError,
    error,
  };
};
