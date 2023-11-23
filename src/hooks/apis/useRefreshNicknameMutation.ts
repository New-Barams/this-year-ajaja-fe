import { refreshNickname } from '@/apis/client/refreshNickname';
import { useMutation } from '@tanstack/react-query';

export const useRefreshNicknameMutation = () => {
  const { data, mutate: refreshNicknameMutation } = useMutation({
    mutationFn: refreshNickname,
  });

  return { refreshedNickname: data!.data.data, refreshNicknameMutation };
};
