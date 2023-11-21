import { authStore } from '@/stores/authStore';
import { useRecoilValue } from 'recoil';

export const useLoggedIn = () => {
  const auth = useRecoilValue(authStore);

  return { isLogin: auth !== null };
};
