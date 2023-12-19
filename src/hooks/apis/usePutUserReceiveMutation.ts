import { putUserReceive } from '@/apis/client/putUserReceive';
import { ReceiveType } from '@/types/apis/users/GetUserInformation';
import { useMutation } from '@tanstack/react-query';

export const usePutUserReceiveMutation = () => {
  const { mutate, isSuccess, isPending, isError } = useMutation({
    mutationFn: (type: ReceiveType) => putUserReceive(type),
  });
  return {
    changeReceiveType: mutate,
    isChangeReceiveTypeSuccess: isSuccess,
    isChangeReceiveTypePending: isPending,
    isChangeReceiveTypeError: isError,
  };
};
