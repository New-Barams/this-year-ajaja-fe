'use client';

import { Icon, RemindInput } from '@/components';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import './index.scss';

interface WritableRemindItemProps {
  remindMonth: number;
  remindDay: number;
  remindMessage: string;
  handleChangeRemindMessage: (text: string) => void;
  makeAllRemindMessageSame?: () => void;
}

const MAX_REMIND_MESSAGE_LENGTH = 255;

export default function WritableRemindItem({
  remindMonth,
  remindDay,
  remindMessage,
  handleChangeRemindMessage,
  makeAllRemindMessageSame,
}: WritableRemindItemProps) {
  const isRemindMessageEmpty = remindMessage.length === 0;

  const [isItemOpened, setIsItemOpened] = useState(
    makeAllRemindMessageSame ? true : false,
  );

  const handleClickToggleIsItemOpened = () => {
    setIsItemOpened(!isItemOpened);
  };

  const [isSameMessageChecked, setIsSameMessageChecked] = useState(false);

  const handleClickSameMessageCheck = () => {
    setIsSameMessageChecked(!isSameMessageChecked);
  };

  // isSameMessageChecked가 바뀌었을 때,참으로 바뀌었을 때만 makeAllRemindMessageSame 실행(모든 메세지 동기화)
  useEffect(() => {
    if (isSameMessageChecked && makeAllRemindMessageSame) {
      console.log(
        'isSameMessageChecked가 바뀌었을 때,참으로 바뀌었으면 makeAllRemindMessageSame 실행(모든 메세지 동기화)',
      );
      makeAllRemindMessageSame();
    }
  }, [isSameMessageChecked]);

  return (
    <div className="remind-item">
      <div
        className="remind-item__header"
        onClick={handleClickToggleIsItemOpened}>
        <p className="remind-item__header__title">
          {remindMonth}월 {remindDay}일에 받을 리마인드 메세지
        </p>

        <div className="remind-item__header__meta">
          {isRemindMessageEmpty && (
            <div className="remind-item__header__warning">
              <Icon name="WARNING" size="xs" color="white-100" />
              <span className="remind-item__header__warning__text">
                리마인드 메세지가 아직 작성되지 않았습니다
              </span>
            </div>
          )}
          <span className="remind-item__header__button-text">
            {isRemindMessageEmpty ? '작성하기' : '수정하기'}
          </span>
          <Icon
            name={isItemOpened ? 'ITEM_CLOSE' : 'ITEM_OPEN'}
            size="xl"
            color="gray-300"
            classNameList={['remind-item__header__icon']}
          />
        </div>
      </div>
      {isItemOpened && (
        <div
          className={classNames('remind-item__message', {
            'remind-item__message--open': isItemOpened,
          })}>
          <RemindInput
            textInput={remindMessage}
            onChangeInput={handleChangeRemindMessage}
            placeholder="미래의 내가 받게 될 리마인드 메세지를 작성해보세요 !"
            maxLength={MAX_REMIND_MESSAGE_LENGTH}
            editable={true}
          />

          <span
            className="remind-item__message__check"
            onClick={handleClickSameMessageCheck}>
            <Icon
              name={isSameMessageChecked ? 'CHECKED' : 'UN_CHECKED'}
              size="2xl"
              color="primary"
              isFilled={isSameMessageChecked ? true : false}
            />
            <p className="remind-item__message__check__text">
              항상 같은 리마인드 메세지 받기
            </p>
          </span>
        </div>
      )}
    </div>
  );
}
