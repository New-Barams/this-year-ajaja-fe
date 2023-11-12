import { auth } from '@/stores/authStore';
import { authStore } from '@/stores/authStore';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export const useAuth = () => {
  const [authState, setAuthState] = useState<auth | null>(null);
  const [auth, setAuth] = useRecoilState(authStore);
  useEffect(() => {
    setAuthState(auth);
  }, [auth]);

  return { auth: authState, setAuth };
};
