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
          await postLogin(code)
            .then((response) => {
              const { data } = response;
              setCookie('auth', data);
              router.replace('/home');
              ajajaToast.success('로그인에 성공했습니다.');
            })
            .catch(() => {
              ajajaToast.error('로그인에 실패했습니다. 다시 시도해주세요');
              router.replace('/login');
            });
        }
      })();
    } else if (way === 'logout') {
      deleteCookie('auth');
      router.push('/login');
      ajajaToast.success('로그아웃에 성공했습니다. ');
    }
  }, [router]);
}
