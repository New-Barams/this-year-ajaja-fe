import { useIsLogIn } from '@/hooks/useIsLogIn';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function useLoginPage() {
  const { isLogin } = useIsLogIn();
  const router = useRouter();
  useEffect(() => {}, [isLogin, router]);

  return { isLogin };
}
