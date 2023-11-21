import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function useLoginPage() {
  const isLogin = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isLogin) router.replace('/home');
  }, [isLogin, router]);

  return { isLogin };
}
