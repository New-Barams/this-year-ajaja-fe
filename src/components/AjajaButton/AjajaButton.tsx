'use client';

import { Icon } from '@/components';
import { usePostAjajaMutation } from '@/hooks/apis/usePostAjajaMutation';
import { useDebounce } from '@/hooks/useDebounce';
import { useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import { useState } from 'react';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import './index.scss';

interface AjajaButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  planId?: number;
  isFilled: boolean;
  ajajaCount: number;
  classNameList?: string[];
}

export default function AjajaButton({
  planId,
  isFilled,
  ajajaCount,
  classNameList = [],
  ...props
}: AjajaButtonProps) {
  const queryClient = useQueryClient();
  const [count, setCount] = useState(ajajaCount);
  const [fill, setFill] = useState(isFilled);
  const [originalCopy, setOriginalCopy] = useState(isFilled);
  const { mutate: postAjaja } = usePostAjajaMutation();
  const handleAjaja = () => {
    if (fill) setCount(count - 1);
    else setCount(count + 1);
    setFill(!fill);
  };

  const compare = () => {
    console.log(originalCopy, fill);
    if (originalCopy !== fill) {
      planId &&
        postAjaja(planId, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['plan', planId] });
          },
        });
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
      {count}
    </button>
  );
}
