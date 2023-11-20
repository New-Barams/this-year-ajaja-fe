'use client';

import { Icon } from '@/components';
import { useDebounce } from '@/hooks/useDebounce';
import classNames from 'classnames';
import { useState } from 'react';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import './index.scss';

interface AjajaButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  isFilled: boolean;
  ajajaCount: number;
  classNameList?: string[];
}

export default function AjajaButton({
  isFilled,
  ajajaCount,
  classNameList = [],
  ...props
}: AjajaButtonProps) {
  const [count, setCount] = useState(ajajaCount);
  const [fill, setFill] = useState(isFilled);
  const [originalCopy, setOriginalCopy] = useState(isFilled);

  const handleAjaja = () => {
    if (fill) setCount(count - 1);
    else setCount(count + 1);
    setFill(!fill);
  };

  const compare = () => {
    console.log(originalCopy, fill);
    if (originalCopy !== fill) {
      console.log('서버 전송 API: ', count, fill);
      setOriginalCopy(fill);
    }
  };

  useDebounce(compare, 500, []);

  return (
    <button
      className={classNames(
        `ajaja-button`,
        `color-origin-gray-300`,
        `font-size-sm`,
        classNameList,
      )}
      onClick={handleAjaja}
      {...props}>
      <div>
        <Icon
          name="AJAJA"
          size="2xl"
          color={fill ? 'primary' : 'gray-100'}
          isFilled={fill}
        />
        <p
          className={classNames('ajaja-name', `color-origin-gray-300`)}
          style={{ fontSize: '0.375rem' }}>
          아좌좌
        </p>
      </div>
      {count >= 1000 ? Math.floor(count / 1000) + 'k' : count}
    </button>
  );
}
