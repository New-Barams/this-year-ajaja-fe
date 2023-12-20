'use client';

import { Icon } from '@/components';
import { QUERY_KEY } from '@/constants/queryKey';
import { usePostAjajaMutation } from '@/hooks/apis/usePostAjajaMutation';
import { useDebounce } from '@/hooks/useDebounce';
import { useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
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
    if (originalCopy !== fill) {
      planId &&
        postAjaja(planId, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [{ planId: planId }, QUERY_KEY.PLAN],
            });
          },
        });
      setOriginalCopy(fill);
    }
  };

  useDebounce(compare, 500, []);

  useEffect(() => {
    setCount(ajajaCount);
  }, [ajajaCount]);

  return (
    <button
      className={classNames(
        `ajaja-button`,
        `color-origin-text-100`,
        `font-size-sm`,
        classNameList,
      )}
      onClick={handleAjaja}
      {...props}>
      <Icon
        name="AJAJA"
        size="lg"
        color={fill ? 'primary' : 'secondary'}
        isFilled={fill}
      />
      <p className={classNames('ajaja-p')}>아좌좌 {count}개</p>
    </button>
  );
}
