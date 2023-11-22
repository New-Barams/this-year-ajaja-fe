import { refreshNickname } from '@/apis/client/refreshNickname';
import { useMutation } from '@tanstack/react-query';

export const useRefreshNicknameMutation = () =>
  useMutation({ mutationFn: () => refreshNickname() });
