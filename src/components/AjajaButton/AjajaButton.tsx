'use client';

import { Icon, Modal, ModalBasic } from '@/components';
import { QUERY_KEY } from '@/constants/queryKey';
import { usePostAjajaMutation } from '@/hooks/apis/usePostAjajaMutation';
import { useDebounce } from '@/hooks/useDebounce';
import { useIsLogIn } from '@/hooks/useIsLogIn';
import { useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const [count, setCount] = useState(ajajaCount);
  const [fill, setFill] = useState(isFilled);
  const [originalCopy, setOriginalCopy] = useState(isFilled);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { isLogin } = useIsLogIn();
  const { mutate: postAjaja } = usePostAjajaMutation();

  const handleModalClickYes = () => {
    router.push('/login');
  };

  const handleModalClickNo = () => {
    setIsOpenModal(false);
  };

  const handleAjaja = () => {
    if (isLogin) {
      if (fill) setCount(count - 1);
      else setCount(count + 1);
      setFill(!fill);
    } else {
      setIsOpenModal(true);
    }
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
    <>
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
      {isOpenModal && (
        <Modal>
          <ModalBasic
            onClickYes={handleModalClickYes}
            onClickNo={handleModalClickNo}
            confirmSentense="로그인 하기">
            로그인이 필요한 기능입니다. 로그인 하시겠습니까?
          </ModalBasic>
        </Modal>
      )}
    </>
  );
}
