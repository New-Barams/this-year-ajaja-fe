import { postVerify } from '@/apis/client/postVerify';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

export const usePostVerifyMutation = ({ throwOnError }: UseMutationOptions) => {
  const { isError, error, isPending, isSuccess, mutateAsync } = useMutation<
    AxiosResponse,
    AxiosError<ErrorResponseData>,
    string
  >({
    mutationFn: postVerify,
    throwOnError,
  });
  return { mutateAsync, isError, error, isPending, isSuccess };
};

interface ErrorResponseData {
  errorMessage: string;
}
