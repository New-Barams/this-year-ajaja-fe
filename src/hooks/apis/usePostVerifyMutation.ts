import { postVerify } from '@/apis/client/postVerify';
import { useMutation } from '@tanstack/react-query';

export const usePostVerifyMutation = () => {
  const { isError, error, isPending, isSuccess, mutateAsync } = useMutation({
    mutationFn: postVerify,
  });
  return { mutateAsync, isError, error, isPending, isSuccess };
};
