'use client';

import { Icon } from '@/components';
import { checkIsSeason } from '@/utils/checkIsSeason';
import classNames from 'classnames';
import { hasCookie } from 'cookies-next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import './index.scss';

export default function Navigation({ hasAuth }: { hasAuth: boolean }) {
  const pathName = usePathname();
  const [isLogin, setIsLogin] = useState(hasAuth);

  if (!hasCookie('auth')) {
    setTimeout(() => {
      setIsLogin(hasCookie('auth'));
    }, 1000);
  }

  return (
    <div className={classNames('navigation')}>
      <Link
        href="/home"
        className={classNames('navigation-icon', {
          'color-origin-primary': pathName === '/home',
          'color-origin-text-300': pathName !== '/home',
        })}>
        <Icon
          name="HOME"
          isFilled={true}
          size="xl"
          color={pathName === '/home' ? 'primary' : 'text-300'}
        />
        <p className={classNames('font-size-xs')}>홈</p>
      </Link>
      <Link
        href="/create"
        className={classNames('navigation-icon', {
          'color-origin-primary': pathName === '/create',
          'color-origin-text-300': pathName !== '/create',
        })}>
        <Icon
          name="CREATE_NEW_PLAN"
          isFilled={true}
          size="xl"
          color={pathName === '/create' ? 'primary' : 'text-300'}
        />
        <p className={classNames('font-size-xs')}>
          {checkIsSeason() ? '계획 작성' : '피드백하기'}
        </p>
      </Link>
      <Link
        href="/explore"
        className={classNames('navigation-icon', {
          'color-origin-primary': pathName === '/explore',
          'color-origin-text-300': pathName !== '/explore',
        })}>
        <Icon
          name="OTHER_PLAN"
          isFilled={true}
          size="xl"
          color={pathName === '/explore' ? 'primary' : 'text-300'}
        />
        <p className={classNames('font-size-xs')}>둘러보기</p>
      </Link>
      <Link
        href={isLogin ? '/my' : '/login'}
        className={classNames('navigation-icon', {
          'color-origin-primary': pathName === '/my' || pathName === '/login',
          'color-origin-text-300': pathName !== '/my' && pathName !== '/login',
        })}>
        <Icon
          name={isLogin ? 'PROFILE' : 'LOGIN'}
          isFilled={true}
          size="xl"
          color={
            pathName === '/my' || pathName === '/login' ? 'primary' : 'text-300'
          }
        />
        <p className={classNames('font-size-xs')}>
          {isLogin ? '마이페이지' : '로그인하기'}
        </p>
      </Link>
    </div>
  );
}