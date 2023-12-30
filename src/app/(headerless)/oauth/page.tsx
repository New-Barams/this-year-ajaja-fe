'use client';

import useOauthPage from './hooks/useOauthPage';
import './index.scss';

export default function OauthPage({}) {
  const { way } = useOauthPage();

  return (
    <div className="oauth__wrapper font-size-4xl">
      {way === 'login' ? <h1>로그인 중....</h1> : <h1>로그아웃 중....</h1>}
    </div>
  );
}
