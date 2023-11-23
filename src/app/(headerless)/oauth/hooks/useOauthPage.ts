import { getTokenWithCode } from '@/apis/client/getTokenWithCode';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function useOauthPage() {
  const router = useRouter();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    (async () => {
      if (code) {
        await getTokenWithCode(code)
          .then((response) => {
            const { data } = response;
            setCookie('auth', data);
          })
          .catch((error) => {
            console.log('로그인 실패' + error);
          })
          .finally(() => {
            // router.push('/home');
          });
      }
    })();
  }, [router]);
}
