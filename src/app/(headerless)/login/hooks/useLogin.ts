import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function useLogin() {
  const { auth } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (auth !== null) router.push('/home');
  }, [auth, router]);
}
