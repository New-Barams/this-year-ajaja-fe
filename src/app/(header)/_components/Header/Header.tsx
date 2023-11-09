import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import LinkIconText from '../LinkIconText/LinkIconText';
import './index.scss';

export default function Header() {
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
          link="/my"
          iconName="PROFILE"
          background="primary"
          color="white-100">
          마이페이지
        </LinkIconText>
      </div>
    </div>
  );
}
