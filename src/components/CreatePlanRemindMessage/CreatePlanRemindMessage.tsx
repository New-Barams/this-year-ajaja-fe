'use client';

import { ModalSendRemindExample, WritableRemindItem } from '@/components';
import classNames from 'classnames';
import React from 'react';
import useCreatePlanRemindMessage from './hooks/useCreatePlanRemindMessage';
import './index.scss';

interface CreatePlanRemindMessageProps {
  setIsLastStepDataAllExist: (isExist: boolean) => void;
  isCreateOrEditPage: 'create' | 'edit';
}

export default function CreatePlanRemindMessage({
  setIsLastStepDataAllExist,
  isCreateOrEditPage,
}: CreatePlanRemindMessageProps) {
  const {
    handleChangeRemindMessage,
    makeAllRemindMessageSame,
    remindMessageList,
    isSendRemindModalOpen,
    setIsSendRemindModalOpen,
  } = useCreatePlanRemindMessage({
    setIsLastStepDataAllExist,
    isCreateOrEditPage,
  });

  return (
    <div className={classNames(['create-remind-message'])}>
      <div className={classNames(['create-remind-message__title'])}>
        선택받은 날짜에 받을 리마인드 메세지를 작성해주세요!
      </div>

      <div className={classNames(['create-remind-message__remind-example'])}>
        <span className={classNames(['font-size-sm', 'color-origin-primary'])}>
          리마인드란 무엇인가요?
        </span>
        <button
          className={classNames([
            'create-remind-message__remind-example__button',
            'font-size-xs',
            'background-origin-primary',
            'color-origin-white-100',
            'border-round',
          ])}
          onClick={() => {
            setIsSendRemindModalOpen(true);
          }}>
          알아보기
        </button>
      </div>

      <ul className={classNames(['create-remind-message__list'])}>
        {remindMessageList.map((item, index) => {
          return index === 0 ? (
            <WritableRemindItem
              key={index}
              remindMonth={item.date.month}
              remindDay={item.date.day}
              remindMessage={item.message}
              handleChangeRemindMessage={(text: string) => {
                handleChangeRemindMessage(item.date.month, item.date.day, text);
              }}
              makeAllRemindMessageSame={makeAllRemindMessageSame}
            />
          ) : (
            <WritableRemindItem
              key={index}
              remindMonth={item.date.month}
              remindDay={item.date.day}
              remindMessage={item.message}
              handleChangeRemindMessage={(text: string) => {
                handleChangeRemindMessage(item.date.month, item.date.day, text);
              }}
            />
          );
        })}
      </ul>

      {isSendRemindModalOpen && (
        <ModalSendRemindExample
          closeModal={() => {
            setIsSendRemindModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
