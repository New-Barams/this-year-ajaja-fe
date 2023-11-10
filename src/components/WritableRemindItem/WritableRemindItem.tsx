'use client';

import { Icon, RemindInput } from '@/components';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

interface WritableRemindItemProps {
  remindMonth: number; // 리마인드 받는 월 ex) 6
  remindDay: number; // 리마인드 받는 날 ex) 15
  remindMessage: string; // 리마인드 메세지 ex) 미래의 민우야
  handleChangeRemindMessage: (text: string) => void; // 리마인드 메세지 업데이트하는 핸들러  => 하위 RemindInput으로 전달될 것
  makeAllRemindMessageSame?: () => void; // 동일한 리마인드 메세지 받기 => 이게 넘어온다면 첫번째 아이템이라는 것
}

// 작성 페이지 && 시즌일 때 수정 중인 상세 페이지에서 렌더링되는 리마인드 아이템 컴포넌트
// 이 아이템의 주요 기능은 결국 ,, 받은 month와 day에 대한 message 상태 값을 입력받은 text로 업데이트 시켜주는 애 !
export default function WritableRemindItem({
  remindMonth,
  remindDay,
  remindMessage,
  handleChangeRemindMessage,
  makeAllRemindMessageSame,
}: WritableRemindItemProps) {
  const [isItemOpened, setIsItemOpened] = useState(
    makeAllRemindMessageSame ? true : false,
  );
  // header 클릭하면 isItemOpened toggle 되도록 => 밑에 있었다 없어졌다 하도록
  const handleClickToggleIsItemOpened = () => {
    console.log('헤더 클릭 => isItemOpened 토글');
    setIsItemOpened(!isItemOpened);
  };

  const [isSameMessageChecked, setIsSameMessageChecked] = useState(false);

  const handleClickSameMessageCheck = () => {
    console.log('체크 박스 클릭 => isSameMessageChecked 토글');
    setIsSameMessageChecked(!isSameMessageChecked);
  };

  // isSameMessageChecked가 바뀌었을 때,참으로 바뀌었으면 makeAllRemindMessageSame 실행(모든 메세지 동기화)
  useEffect(() => {
    if (isSameMessageChecked && makeAllRemindMessageSame) {
      console.log(
        'isSameMessageChecked가 바뀌었을 때,참으로 바뀌었으면 makeAllRemindMessageSame 실행(모든 메세지 동기화)',
      );
      makeAllRemindMessageSame();
    }
  }, [isSameMessageChecked, makeAllRemindMessageSame]);

  return (
    <div className="remind-item">
      <div
        className="remind-item__header"
        onClick={handleClickToggleIsItemOpened}>
        <p className="remind-item__header__title">
          {remindMonth}월 {remindDay}일에 받을 리마인드 메세지
        </p>
        <span className="remind-item__header__warning">
          리마인드 메세지가 아직 작성되지 않았습니다.
        </span>
        <span className="remind-item__header__button-text">
          {remindMessage.length === 0 ? '작성하기' : '수정하기'}
        </span>
        <Icon
          name={isItemOpened ? 'ITEM_CLOSE' : 'ITEM_OPEN'}
          size="xl"
          color="gray-300"
        />
      </div>
      {isItemOpened && (
        <div
          className={classNames('remind-item__message', {
            'remind-item__message--open': isItemOpened,
          })}>
          <RemindInput
            textInput={remindMessage}
            onChangeInput={handleChangeRemindMessage}
            placeholder="리마인드 메세지를 입력해보세요 !"
            maxLength={255}
          />

          <span
            className="remind-item__message__check"
            onClick={handleClickSameMessageCheck}>
            <Icon
              name={isSameMessageChecked ? 'CHECKED' : 'UN_CHECKED'}
              size="xl"
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

// TODO: string, number 상수화
