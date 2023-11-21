import { auth, authStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

export default function useOauthPage() {
  const setAuth = useSetRecoilState(authStore);

  const router = useRouter();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    (async () => {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login?code=${code}`, {
        method: 'POST',
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const auth: auth = {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          };
          console.log(auth);
          setAuth(auth);
        });

      // history.length >= 2 ? history.go(-2) : router.replace('/home');
    })();
  }, [setAuth, router]);
}
