import { postLogin } from '@/apis/client/postLogin';
import { ajajaToast } from '@/components/Toaster/customToast';
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
          await postLogin(code).then((response) => {
            //TODO: 로그인 실패 처리 필요, maxAge 상수화
            const { data } = response;
            setCookie('auth', data, { maxAge: 604800 });
            router.push('/home');
            ajajaToast.success('로그인에 성공했습니다.');
          });
        }
      })();
    } else if (way === 'logout') {
      deleteCookie('auth');
      router.push('/login');
    }
  }, [router]);
}
