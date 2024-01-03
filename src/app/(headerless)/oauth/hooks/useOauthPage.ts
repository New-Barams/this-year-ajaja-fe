import { postLogin } from '@/apis/client/postLogin';
import { COOKIE_MAX_AGE } from '@/constants/cookie';
import { deleteCookie, setCookie } from 'cookies-next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function useOauthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const way = searchParams.get('way');
  const code = searchParams.get('code');

  useEffect(() => {
    if (way === 'login' && code) {
      (async () => {
        try {
          const { data: tokens } = await postLogin(code);
          setCookie('auth', tokens, { maxAge: COOKIE_MAX_AGE });
          window.location.replace('/home');
        } catch (error) {
          alert('로그인에 실패했습니다. 잠시 후 시도해주세요');
          router.replace('/login');
        }
      })();
    } else if (way === 'logout') {
      deleteCookie('auth');
      window.location.replace('/login');
    } else {
      router.replace('/');
    }
  }, [router, code, way]);

  return { way };
}
