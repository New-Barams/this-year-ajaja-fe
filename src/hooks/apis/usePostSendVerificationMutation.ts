import { postSendVerification } from '@/apis/client/postSendVerification';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

export const usePostSendVerificationMutation = () => {
  const {
    mutateAsync,
    isError,
    isSuccess,
    error,

    isPending,
  } = useMutation<AxiosResponse, AxiosError<ErrorResponseData>, string>({
    mutationFn: (email: string) => postSendVerification(email),
  });
  return {
    mutateAsync,
    isPending,
    isSuccess,
    isError,
    error,
  };
};

interface ErrorResponseData {
  errorMessage: string;
}
