import { postVerify } from '@/apis/client/postVerify';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

export const usePostVerifyMutation = () => {
  const { isError, error, isPending, isSuccess, mutateAsync } = useMutation<
    AxiosResponse,
    AxiosError<ErrorResponseData>,
    string
  >({
    mutationFn: postVerify,
  });
  return { mutateAsync, isError, error, isPending, isSuccess };
};

interface ErrorResponseData {
  errorMessage: string;
}
