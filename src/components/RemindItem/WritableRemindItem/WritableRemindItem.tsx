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
  classNameList?: string[];
}

const MAX_REMIND_MESSAGE_LENGTH = 255;

export default function WritableRemindItem({
  remindMonth,
  remindDay,
  remindMessage,
  handleChangeRemindMessage,
  makeAllRemindMessageSame,
  classNameList = [],
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
  }, [
    isFirstRemindItem,
    isSameMessageChecked,
    makeAllRemindMessageSame,
    remindMessage,
  ]);

  return (
    <>
      <li className={classNames('remind-item', classNameList)}>
        <div
          className="remind-item__header"
          onClick={handleClickToggleIsItemOpened}>
          <p className="remind-item__header__title">
            {remindMonth}월 {remindDay}일 메세지
          </p>

          <div className="remind-item__header__meta">
            <div
              className={classNames(
                'remind-item__header__word-length',
                `color-origin-${isRemindMessageEmpty ? 'primary' : 'text-100'}`,
              )}>
              {`${remindMessage.length}/${MAX_REMIND_MESSAGE_LENGTH}`}
            </div>
            <Icon
              name={isItemOpened ? 'ITEM_CLOSE' : 'ITEM_OPEN'}
              size="lg"
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
          </div>
        )}
      </li>

      {isFirstRemindItem && (
        <div className="remind-item__message__check">
          <p
            className={classNames(
              'remind-item__message__check__title',
              'font-size-sm',
            )}>
            입력해야 할 메세지가 너무 많으신가요?
          </p>
          <div
            className="remind-item__message__check__content"
            onClick={handleClickSameMessageCheck}>
            <Icon
              name={isSameMessageChecked ? 'CHECKED' : 'UN_CHECKED'}
              size="md"
              color="primary"
              isFilled={isSameMessageChecked ? true : false}
            />
            <p
              className={classNames(
                'remind-item__message__check__text',
                'font-size-sm',
              )}>
              모든 메세지를 첫 번째 메세지와 동일하게 작성하기
            </p>
          </div>
        </div>
      )}

      {isSameMessageModalOpen && !isSameMessageChecked && (
        <Modal>
          <ModalBasic
            onClickYes={handleModalClickYes}
            onClickNo={handleModalClickNo}
            confirmSentense="적용 하기">
            다른 모든 리마인드 메세지가 해당 메세지와 동일한 내용으로
            변경됩니다. 정말 적용하시겠습니까?
          </ModalBasic>
        </Modal>
      )}
    </>
  );
}
