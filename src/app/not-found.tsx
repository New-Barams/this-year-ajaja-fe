import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import './not-found.scss';

export default function NotFound() {
  return (
    <div className="NotFound__wrapper">
      <Image
        src="/404-page.svg"
        alt="This Year Ajaja 404"
        width={160}
        height={160}
        priority
      />
      <p className="NotFound__title">존재하지 않는 페이지입니다😭</p>

      <Link
        href="/home"
        className={classNames(
          'NotFound__description',
          'color-origin-secondary',
        )}>
        홈 페이지로 이동하기
      </Link>
    </div>
  );
}
