import { useLoggedIn } from '@/hooks/useLoggedIn';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function useLoginPage() {
  const { isLogin } = useLoggedIn();
  const router = useRouter();
  useEffect(() => {
    if (isLogin) router.replace('/home');
  }, [isLogin, router]);

  return { isLogin };
}
