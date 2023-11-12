'use client';

import { KAKAO_LOGIN_URL } from '@/constants';
import { UN_AUTH_URL } from '@/constants/login';
import Image from 'next/image';
import Link from 'next/link';
import useLogin from './hooks/useLogin';
import './index.scss';

export default function LoginPage() {
  useLogin();
  return (
    <div className="wrapper">
      <div className="login">
        <Image
          className="login__logo"
          src="/this-year-ajaja-logo.svg"
          width={260}
          height={190}
          alt="thisYearAjajaLogo"
        />
        <div className="login__sentence color-origin-gray-300 font-size-2xl">
          <span className="login__sentence--text">
            올해의 신년 계획을 생성하고,
          </span>
          <span className="login__sentence--text">
            주기적으로 리마인드 받아보세요!!
          </span>
        </div>
        <div className="login__buttons">
          <Link
            className="login__buttons--kakaoLogin"
            href={KAKAO_LOGIN_URL}
            replace>
            <Image
              src="/kakao_login_large_narrow.png"
              width={230}
              height={60}
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
