import Image from 'next/image';
import Link from 'next/link';
import './index.scss';

export default function LoginPage() {
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
        <div className="login__sentence">
          <p className="login__sentence--text">올해의 신년 계획을 생성하고,</p>
          <p className="login__sentence--text">
            주기적으로 리마인드 받아보세요!!
          </p>
        </div>
        <div className="login__buttons">
          <Link className="login__buttons--kakaoLogin" href="/login">
            <Image
              src="/kakao_login_large_narrow.png"
              width={230}
              height={60}
              alt="kakaoLogin"
            />
          </Link>
          <Link className="login__buttons--unLogin" href="/explore">
            로그인 하지 않고 둘러보기
          </Link>
        </div>
      </div>
    </div>
  );
}
