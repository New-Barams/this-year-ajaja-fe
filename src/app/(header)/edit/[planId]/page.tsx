'use client';

import { Button, WritableRemind } from '@/components';
import { RemindItemType, RemindOptionType } from '@/types/components/Remind';
import { decideRemindDate } from '@/utils/decideRemindDate';
import classNames from 'classnames';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import './index.scss';

export default function EditPage({ params }: { params: { planId: string } }) {
  const { planId } = params;

  const editPlan = () => {
    console.log(`${planId}에 해당하는 계획 수정 API 호출 `);
  };

  const [isRemindOn, setIsRemindOn] = useState(true);
  const toggleIsRemindOn = () => {
    setIsRemindOn(!isRemindOn);
  };

  const [remindOptions, setRemindOptions] = useState<RemindOptionType>({
    TotalPeriod: 12,
    Term: 1,
    Date: 1,
    Time: 9,
  });

  const handleChangeRemindOption = (
    optionKey: string,
    newOptionValue: number,
  ) => {
    setRemindOptions({
      ...remindOptions,
      [optionKey]: newOptionValue,
    });
  };

  const [remindMessageList, setRemindMessageList] = useState<RemindItemType[]>(
    [],
  );

  const handleChangeRemindMessage = (
    month: number,
    day: number,
    newMessage: string,
  ) => {
    const newRemindList = remindMessageList.map((item) => {
      if (item.date.month === month && item.date.day === day) {
        return { ...item, message: newMessage };
      }
      return item;
    });

    setRemindMessageList(newRemindList);
  };

  const fixRemindOptions = () => {
    const fixedRemindDate = decideRemindDate(
      remindOptions.TotalPeriod,
      remindOptions.Term,
      remindOptions.Date,
    );

    const newRemindMessageList: RemindItemType[] = [];
    fixedRemindDate?.forEach((newDate) => {
      newRemindMessageList.push({
        date: {
          month: newDate.month,
          day: newDate.day,
        },
        message: '',
      });
    });

    setRemindMessageList(newRemindMessageList);
  };

  const makeAllRemindMessageSame = useCallback(() => {
    if (remindMessageList.length <= 1) {
      return;
    }

    const firstRemindMessage = remindMessageList[0].message;
    const updatedList = remindMessageList.map((item) => {
      return { ...item, message: firstRemindMessage };
    });

    setRemindMessageList(updatedList);
  }, [remindMessageList]);

  return (
    <div className={classNames('edit-page')}>
      <WritableRemind
        isEditPage={true}
        isRemindOn={isRemindOn}
        toggleIsRemindOn={toggleIsRemindOn}
        remindOption={remindOptions}
        setRemindOption={handleChangeRemindOption}
        fixRemindOptions={fixRemindOptions}
        remindMessageList={remindMessageList}
        setRemindMessage={handleChangeRemindMessage}
        makeAllRemindMessageSame={makeAllRemindMessageSame}
      />

      <div className={classNames('edit-page__button__container')}>
        <Button
          background="white-100"
          color="primary"
          size="lg"
          border={true}
          onClick={() => {
            editPlan();
          }}>
          수정 완료
        </Button>
        <Link href={`/plans/${planId}`}>
          <Button
            background="primary"
            color="white-100"
            size="lg"
            border={false}>
            나가기
          </Button>
        </Link>
      </div>
    </div>
  );
}
