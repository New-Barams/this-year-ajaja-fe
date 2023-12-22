'use client';

import classNames from 'classnames';
import Image from 'next/image';
import { Icon } from '..';
import './index.scss';

export default function BasicError({ reset }: { reset: () => void }) {
  return (
    <div className="Basic-Error__wrapper">
      <Image
        src="/error-boundary.svg"
        alt="This Year Ajaja 404"
        width={160}
        height={160}
        priority
      />

      <p className="Basic-Error__title">
        현재 페이지에서 오류가 발생했습니다😭
      </p>

      <div
        className={classNames(
          'Basic-Error__description',
          'color-origin-secondary',
        )}
        onClick={() => reset()}>
        <span>다시 시도하기</span>{' '}
        <Icon size="lg" name="REFRESH" color="secondary" />
      </div>
    </div>
  );
}
