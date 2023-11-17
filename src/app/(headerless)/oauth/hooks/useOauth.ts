import { useAuth } from '@/hooks/useAuth';
import { auth } from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function useOauth() {
  const { setAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    (async () => {
      await fetch(
        `${process.env.NEXT_PUBLIC_TEST_API_END_POINT}/login?code=${code}`,
        {
          method: 'POST',
        },
      )
        .then((res) => res.json())
        .then((data) => {
          const auth: auth = {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          };
          console.log('useOauth:', auth);
          setAuth(auth);
        });

      history.length >= 2 ? history.go(-2) : router.replace('/home');
    })();
  }, [setAuth, router]);
}
