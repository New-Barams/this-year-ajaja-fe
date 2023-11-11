'use client';

import { Icon, Modal, ModalBasic, RemindInput } from '@/components';
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
  const isFirstRemindItem = makeAllRemindMessageSame !== undefined;

  const [isItemOpened, setIsItemOpened] = useState(
    makeAllRemindMessageSame ? true : false,
  );

  const handleClickToggleIsItemOpened = () => {
    setIsItemOpened(!isItemOpened);
  };

  const [isSameMessageChecked, setIsSameMessageChecked] = useState(false);
  const [isSameMessageModalOpen, setIsSameMessageModalOpen] = useState(false);

  const handleClickSameMessageCheck = () => {
    // 체크박스 클릭 시 => 모달 오픈
    console.log('체크박스 클릭');
    if (isSameMessageChecked) {
      setIsSameMessageChecked(false);
    } else {
      setIsSameMessageModalOpen(!isSameMessageModalOpen);
    }
  };

  // isSameMessageModalOpen && checked===false 일때만 모달 오픈 되도록 하자 !

  const handleModalClickYes = () => {
    console.log('모달에서 예 클릭');
    setIsSameMessageChecked(true);
    setIsSameMessageModalOpen(false); // 모달 닫기
  };

  const handleModalClickNo = () => {
    console.log('모달에서 아니오 클릭');
    setIsSameMessageChecked(false);
    setIsSameMessageModalOpen(false);
  };

  // isSameMessageChecked가 바뀌었을 때, true로 바뀌었을 때만 모달 띄워주기
  // 모달에서 예 클릭 시 makeAllRemindMessageSame 실행(모든 메세지 동기화)
  // 아니오 클릭 시 모달 닫아주기

  useEffect(() => {
    if (isFirstRemindItem && isSameMessageChecked) {
      makeAllRemindMessageSame();
    }
  }, [isFirstRemindItem, isSameMessageChecked, makeAllRemindMessageSame]);

  return (
    <>
      <div className="remind-item">
        <div
          className="remind-item__header"
          onClick={handleClickToggleIsItemOpened}>
          <p className="remind-item__header__title">
            {remindMonth}월 {remindDay}일에 받을 리마인드 메세지
          </p>

          <div className="remind-item__header__meta">
            {isRemindMessageEmpty && (
              <div
                className={classNames(
                  'remind-item__header__warning',
                  'background-origin-primary',
                )}>
                <Icon name="WARNING" size="xs" color="white-100" />
                <span
                  className={classNames(
                    'remind-item__header__warning__text',
                    'color-origin-white-100',
                  )}>
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
            className={classNames(
              'remind-item__message',
              'background-origin-white-300',
              {
                'remind-item__message--open': isItemOpened,
              },
            )}>
            <RemindInput
              textInput={remindMessage}
              onChangeInput={handleChangeRemindMessage}
              placeholder="미래의 내가 받게 될 리마인드 메세지를 작성해보세요 !"
              maxLength={MAX_REMIND_MESSAGE_LENGTH}
              editable={true}
            />

            {isFirstRemindItem && (
              <span
                className="remind-item__message__check"
                onClick={handleClickSameMessageCheck}>
                <Icon
                  name={isSameMessageChecked ? 'CHECKED' : 'UN_CHECKED'}
                  size="2xl"
                  color="primary"
                  isFilled={isSameMessageChecked ? true : false}
                />
                <p
                  className={classNames(
                    'remind-item__message__check__text',
                    'color-origin-primary',
                  )}>
                  항상 같은 리마인드 메세지 받기
                </p>
              </span>
            )}
          </div>
        )}
      </div>
      {isSameMessageModalOpen && isSameMessageChecked === false && (
        <Modal>
          <ModalBasic
            onClickYes={handleModalClickYes}
            onClickNo={handleModalClickNo}>
            다른 모든 리마인드 메세지가 해당 메세지와 동일한 내용으로
            변경됩니다. 정말 적용하시겠습니까?
          </ModalBasic>
        </Modal>
      )}
    </>
  );
}
