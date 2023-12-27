import { postLogin } from '@/apis/client/postLogin';
import { COOKIE_MAX_AGE } from '@/constants/cookie';
import { deleteCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function useOauthPage() {
  const router = useRouter();

  useEffect(() => {
    const way = new URL(window.location.href).searchParams.get('way');

    if (way === 'login') {
      const code = new URL(window.location.href).searchParams.get('code');
      (async () => {
        if (code) {
          await postLogin(code)
            .then((response) => {
              //TODO: 로그인 실패 처리 필요, await 와 then을같이 쓰는게 맞나?
              const { data } = response;
              //TODO: 테스트를 위해 5분
              setCookie('auth', data, { maxAge: COOKIE_MAX_AGE });
              window.location.replace('/home');
            })
            .catch(() => {
              alert('로그인에 실패했습니다. 잠시 후 시도해주세요');
              router.replace('/login');
            });
        }
      })();
    } else if (way === 'logout') {
      deleteCookie('auth');
      window.location.replace('/login');
    }
  }, [router]);
}
