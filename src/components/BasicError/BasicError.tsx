'use client';

import classNames from 'classnames';
import Image from 'next/image';
import { Icon } from '..';
import './index.scss';

export default function BasicError({ reset }: { reset: () => void }) {
  return (
    <div className="Basic-Error__wrapper">
      <Image
        src="/404-page.svg"
        alt="This Year Ajaja 404"
        width={350}
        height={350}
        priority
      />
      <p className="Basic-Error__title">
        현재 페이지에서 오류가 발생했습니다 😭
      </p>

      <div
        className={classNames(
          'Basic-Error__description',
          'color-origin-gray-200',
        )}
        onClick={() => reset()}>
        <span>다시 시도하기</span> <Icon name="REFRESH" color="gray-200" />
      </div>
    </div>
  );
}
