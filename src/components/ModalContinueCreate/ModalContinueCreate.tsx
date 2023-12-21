'use client';

import { useModalClose } from '@/hooks/useModalClose';
import classNames from 'classnames';
import React, { useRef } from 'react';
import { Button, Modal } from '..';
import './index.scss';

interface ModalContinueCreateProps {
  onClickContinueCreateModalYes: () => void;
  onClickContinueCreateModalNo: () => void;
}

export default function ModalContinueCreate({
  onClickContinueCreateModalYes,
  onClickContinueCreateModalNo,
}: ModalContinueCreateProps) {
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  useModalClose(backgroundRef, onClickContinueCreateModalNo);

  return (
    <Modal>
      <div
        className={classNames([
          'continue-create-modal__wrapper',
          'background-origin-white-100',
        ])}
        ref={backgroundRef}>
        <div className={classNames(['continue-create-modal__content'])}>
          <div className={classNames(['continue-create-modal__content__text'])}>
            <p>작성 중인 계획이 있습니다.</p>
            <p>이어서 계획을 작성하시겠습니까?</p>
          </div>

          <div
            className={classNames([
              'continue-create-modal__content__button-group',
            ])}>
            <Button
              background="white-100"
              border={true}
              color="primary"
              onClick={() => {
                onClickContinueCreateModalYes();
              }}>
              이어서 작성
            </Button>
            <Button
              background="primary"
              border={false}
              color="white-100"
              onClick={() => {
                onClickContinueCreateModalNo();
              }}>
              새로 작성
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
