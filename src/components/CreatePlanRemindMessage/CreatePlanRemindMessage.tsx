'use client';

import { SESSION_STORAGE_KEY } from '@/constants';
import { useSessionStorage } from '@/hooks/useSessionStorage';
import { RemindItemType } from '@/types/Remind';
import classNames from 'classnames';
import React, { useCallback, useEffect } from 'react';
import { WritableRemindItem } from '..';
import './index.scss';

interface CreatePlanRemindMessageProps {
  setIsLastStepDataAllExist: (isExist: boolean) => void;
}
export default function CreatePlanRemindMessage({
  setIsLastStepDataAllExist,
}: CreatePlanRemindMessageProps) {
  const [remindMessageList, setRemindMessageList] = useSessionStorage<
    RemindItemType[]
  >({
    key: SESSION_STORAGE_KEY.STEP_4,
    initialValue: [],
    // 이 초기값은 사실 쓰여질 일이 없음 => 3번에서 4번으로 넘어올 때 이미 날짜 확정 모달 클릭 후 각 날짜에 해당하는 기본값을 ""로 설정해주고 넘어왔을 것이므로
  });

  useEffect(() => {
    if (remindMessageList) {
      if (
        remindMessageList.every((remindItem) => remindItem.message.length > 0)
      ) {
        setIsLastStepDataAllExist(true);
      } else {
        setIsLastStepDataAllExist(false);
      }
      // TODO: 1,2,3단계에 대한 is~StepDataAllExist가 true일 때도 검사해줘야할까
    }
  }, [remindMessageList, setIsLastStepDataAllExist]);

  const handleChangeRemindMessage = (
    month: number,
    day: number,
    newMessage: string,
  ) => {
    setRemindMessageList(
      remindMessageList.map((item) => {
        if (item.date.month === month && item.date.day === day) {
          return { ...item, message: newMessage };
        }
        return item;
      }),
    );
  };

  // 이게 첫 번째 리마인드 메세지가 변할 때에만 이뤄줘야 함
  const makeAllRemindMessageSame = useCallback(() => {
    if (remindMessageList.length > 1) {
      const firstMessage = remindMessageList[0].message;
      setRemindMessageList(
        remindMessageList.map((item) => ({ ...item, message: firstMessage })),
      );
    }
  }, [remindMessageList, setRemindMessageList]);

  return (
    <div className={classNames(['create-remind-message'])}>
      <div className={classNames(['create-remind-message__title'])}>
        선택받은 날짜에 받을 리마인드 메세지를 작성해주세요 !
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
    </div>
  );
}
