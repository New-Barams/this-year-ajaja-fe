'use client';

import { KAKAO_LOGIN_URL, UN_AUTH_URL } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import IntroduceSwiper from './_components/IntroduceSwiper/IntroduceSwiper';
import './index.scss';
import kakoLogin from '/public/loginPage/kakao_login_large_wide.png';

export default function LoginPage() {
  return (
    <div className="wrapper">
      <div className="login">
        <div className="login__welcome-text">
          <h1>혹시 신년 계획 세우셨나요?</h1>
          <h1>
            아직이라면,{' '}
            <Image
              className="login__welcome-text--logo"
              src="/this-year-ajaja-logo.svg"
              width={175}
              height={32}
              alt="올해도 아자자"
            />
          </h1>
        </div>
        <IntroduceSwiper />
        <div className="login__buttons">
          <Link
            className="login__buttons--kakaoLogin"
            href={KAKAO_LOGIN_URL}
            replace>
            <Image
              className="login__buttons--image"
              src={kakoLogin}
              alt="kakaoLogin"
            />
          </Link>
          <Link
            className="login__buttons--unAuth color-origin-gray-200"
            href={UN_AUTH_URL}>
            로그인 하지 않고 둘러보기
          </Link>
        </div>
      </div>
    </div>
  );
}
