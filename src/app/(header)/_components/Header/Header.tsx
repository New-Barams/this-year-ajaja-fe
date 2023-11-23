import classNames from 'classnames';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import LinkIconText from '../LinkIconText/LinkIconText';
import './index.scss';

export default function Header() {
  const auth = cookies().get('auth');
  const isLogin = auth ? true : false;
  return (
    <div className={classNames(`header`)}>
      <Link href={'/home'}>
        <Image
          src="/this-year-ajaja-logo.svg"
          alt="This Year Ajaja Logo"
          width={100}
          height={75}
          priority
        />
      </Link>
      <div className={classNames(`header__link`)}>
        <LinkIconText
          link="/explore"
          iconName="OTHER_PLAN"
          background="primary"
          color="white-100"
          isFilled={true}>
          다른 계획 둘러보기
        </LinkIconText>
        <LinkIconText
          link={isLogin ? '/my' : '/login'}
          iconName="PROFILE"
          background={isLogin ? 'primary' : 'white-100'}
          color={isLogin ? 'white-100' : 'primary'}
          border={isLogin ? 'white-100' : 'primary'}>
          {isLogin ? '마이페이지' : '로그인'}
        </LinkIconText>
      </div>
    </div>
  );
}
