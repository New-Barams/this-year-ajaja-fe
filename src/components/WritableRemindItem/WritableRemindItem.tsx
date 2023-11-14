'use client';

import { Icon, Modal, ModalBasic, RemindInput } from '@/components';
import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
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
  const isRemindMessageEmpty = useMemo(() => {
    return remindMessage.length === 0;
  }, [remindMessage]);

  const isFirstRemindItem = useMemo(() => {
    return makeAllRemindMessageSame !== undefined;
  }, [makeAllRemindMessageSame]);

  const [isItemOpened, setIsItemOpened] = useState(
    makeAllRemindMessageSame ? true : false,
  );

  const handleClickToggleIsItemOpened = () => {
    setIsItemOpened(!isItemOpened);
  };

  const [isSameMessageChecked, setIsSameMessageChecked] = useState(false);
  const [isSameMessageModalOpen, setIsSameMessageModalOpen] = useState(false);

  const handleClickSameMessageCheck = () => {
    if (isSameMessageChecked) {
      setIsSameMessageChecked(false);
    } else {
      setIsSameMessageModalOpen(!isSameMessageModalOpen);
    }
  };

  const handleModalClickYes = () => {
    setIsSameMessageChecked(true);
    setIsSameMessageModalOpen(false);
  };

  const handleModalClickNo = () => {
    setIsSameMessageChecked(false);
    setIsSameMessageModalOpen(false);
  };

  useEffect(() => {
    if (isFirstRemindItem && isSameMessageChecked) {
      makeAllRemindMessageSame!();
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
      {isSameMessageModalOpen && !isSameMessageChecked && (
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
