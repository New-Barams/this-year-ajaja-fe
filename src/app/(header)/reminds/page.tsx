'use client';

import { IconSwitchButton } from '@/components';
import classNames from 'classnames';
import React from 'react';
import './index.scss';

export default function RemindPage() {
  return (
    <div className={classNames(['remind-page'])}>
      <div className={classNames(['remind-page__title', 'font-size-xl'])}>
        리마인드
      </div>

      <p>수정</p>

      <ul></ul>

      <p>
        <span>아침(09시)</span>에 리마인드를 받고 있어요!
      </p>

      <IconSwitchButton
        onIconName="NOTIFICATION_ON"
        offIconName="NOTIFICATION_OFF"
        onClick={() => {
          console.log('hello');
        }}
        isActive={false}
      />
      <p>리마인드 알림 활성화</p>
    </div>
  );
}
