'use client';

import { Button } from '@/components';
import { useModalClose } from '@/hooks/useModalClose';
import classNames from 'classnames';
import { useRef } from 'react';
import './index.scss';

type ModalProps = {
  onClickYes: () => void;
  onClickNo: () => void;
  confirmSentense: string;
  children: React.ReactNode;
};

export default function ModalBasic({
  onClickYes,
  onClickNo,
  confirmSentense,
  children,
}: ModalProps) {
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  useModalClose(backgroundRef, onClickNo);
  return (
    <div
      className={classNames(
        `modal-basic-wrapper`,
        'background-origin-white-100',
      )}
      ref={backgroundRef}>
      <div className={classNames(`modal-basic-wrapper__content`)}>
        <div
          className={classNames(`font-size-base`, `modal-basic-wrapper__text`)}>
          {children}
        </div>
        <div className={classNames(`modal-basic-wrapper__button`)}>
          <Button
            background="primary"
            color="white-100"
            border={false}
            onClick={onClickYes}>
            {confirmSentense}
          </Button>
        </div>
      </div>
    </div>
  );
}
