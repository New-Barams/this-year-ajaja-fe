import { postSendVerification } from '@/apis/client/postSendVerification';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

export const usePostSendVerificationMutation = ({
  throwOnError,
}: UseMutationOptions) => {
  const { mutate, isError, isSuccess, error, isPending } = useMutation<
    AxiosResponse,
    AxiosError<ErrorResponseData>,
    string
  >({
    mutationFn: (email: string) => postSendVerification(email),
    throwOnError,
  });
  return {
    mutate,
    isPending,
    isSuccess,
    isError,
    error,
  };
};

interface ErrorResponseData {
  errorMessage: string;
}
