'use client';

import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';
import { Modal, ModalBasic } from '..';
import './index.scss';
import remind_example_email_temp from '/public/remind_example_email_temp.png';
import remind_example_kakao from '/public/remind_example_kakao.png';

interface ModalSendRemindExampleProps {
  closeModal: () => void;
}

export default function ModalSendRemindExample({
  closeModal,
}: ModalSendRemindExampleProps) {
  const sendRemindExample = () => {
    console.log('예시 리마인드 전송 후 완료 시 toast 띄우기 ! ');
  };

  const onClickSendRemindExample = () => {
    sendRemindExample();
    closeModal();
  };

  return (
    <Modal>
      <ModalBasic
        onClickYes={onClickSendRemindExample}
        onClickNo={() => {
          closeModal();
        }}
        confirmSentense="체험하기">
        <p className={classNames(['remind-example__title', 'font-size-lg'])}>
          리마인드 메세지란?
        </p>

        <p className="remind-example__description">
          미래의 나에게 보내는 메세지에요.
        </p>

        <div className="remind-example__content">
          <div className="remind-example__kakao">
            <p
              className={classNames([
                'remind-example__kakao__title',
                'font-size-xs',
              ])}>
              카카오톡
            </p>
            <Image
              className="remind-example__kakao__image"
              src={remind_example_kakao}
              alt="리마인드 메세지 예시 - 카카오톡"
            />
          </div>

          <div className="remind-example__email">
            <p
              className={classNames([
                'remind-example__email__title',
                'font-size-xs',
              ])}>
              이메일
            </p>
            <Image
              className="remind-example__email__image"
              src={remind_example_email_temp}
              alt="리마인드 메세지 예시 - 이메일"
            />
          </div>
        </div>

        <div className="remind-example__try">
          <p
            className={classNames([
              'remind-example__try__title',
              'font-size-sm',
            ])}>
            설정된 알림 방식으로 체험해볼 수 있어요!
          </p>
          <p
            className={classNames([
              'remind-example__try__warning-text',
              'font-size-sm',
              'color-origin-primary',
            ])}>
            {'(1일 3번 제한)'}
          </p>
        </div>
      </ModalBasic>
    </Modal>
  );
}
