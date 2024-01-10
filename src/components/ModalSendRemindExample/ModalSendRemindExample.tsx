'use client';

import React from 'react';
import { Modal, ModalBasic } from '..';
import './index.scss';

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
        <p>리마인드 메세지란?</p>

        <p>미래의 나에게 보내는 메세지에요.</p>

        <div>
          <div>
            <p>카카오톡</p>
            <img />
          </div>
          <div>
            <p>이메일</p>
            <img />
          </div>
        </div>

        <p>설정된 알림 방식으로 체험해볼 수 있어요!</p>
        <p>{'(1일 3번 제한)'}</p>
      </ModalBasic>
    </Modal>
  );
}
