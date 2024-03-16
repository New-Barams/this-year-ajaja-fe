'use client';

import { Icon } from '@/components';
import Link from 'next/link';
import './index.scss';

const headerContent = {
  notice: {
    text: '🕊️[공지] 이용 약관과 개인 정보 처리방침이 변경되었습니다. 다들 확인 부탁드립니다.',
    link: '/notice',
  },
};
// TODO 알림 버튼 클릭 처리
export default function MainHeader() {
  return (
    <div className="main-header__container">
      <Link className="main-header__text" href={headerContent.notice.link}>
        {headerContent.notice.text}
      </Link>
      <div className="main-header__buttons">
        <Link href={'/notice'}>
          <Icon name="CAMPAIGN" size="lg" />
        </Link>
        <button>
          <Icon name="NOTIFICATION_ON" size="lg" />
        </button>
      </div>
    </div>
  );
}
