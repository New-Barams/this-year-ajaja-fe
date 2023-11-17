'use client';

import { Button, WritableRemind } from '@/components';
import { RemindItemType, RemindOptionType } from '@/types/components/Remind';
import { decideRandomIconNumber } from '@/utils/decideRandomIconNumber';
import { decideRemindDate } from '@/utils/decideRemindDate';
import classNames from 'classnames';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import './index.scss';

type createPlanData = {
  title: string;
  description: string;
  remindTotalPeriod: number;
  remindTerm: number;
  remindDate: number;
  remindTime: number;
  isPublic: boolean;
  tags: string[];
  messages: string[];
  icon: number;
};

export default function CreatePage() {
  // 시즌이 아니거나 로그인 안 되어있을 때, 로그인 페이지로 redirect
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const [isPublic, setPublic] = useState(true);
  // const [tags, setTags] = useState([]);

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

  // 리마인드 옵션 확정버튼 클릭 시 이에 따라 리마인드 날짜 생성 및 리마인드 아이템 렌더링해주는 함수
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

  const createNewPlan = () => {
    const data: createPlanData = {
      icon: decideRandomIconNumber(),
      isPublic: isPublic,
      title: title,
      description: description,
      tags: tags,
      remindTotalPeriod: remindOptions.TotalPeriod,
      remindTerm: remindOptions.Term,
      remindDate: remindOptions.Date,
      remindTime: remindOptions.Time,
      messages: remindMessageList.map((messageItem) => {
        return messageItem.message;
      }),
    };

    console.log(`위 데이터를 이용해 새 계획 생성 API 호출 : ${data}`);
  };

  return (
    <div className={classNames('create-page')}>
      <WritableRemind
        isEditPage={false}
        remindOption={remindOptions}
        setRemindOption={handleChangeRemindOption}
        fixRemindOptions={fixRemindOptions}
        remindMessageList={remindMessageList}
        setRemindMessage={handleChangeRemindMessage}
        makeAllRemindMessageSame={makeAllRemindMessageSame}
      />

      <div className={classNames('create-page__button__container')}>
        <Button
          background="white-100"
          color="primary"
          size="lg"
          border={true}
          onClick={() => {
            createNewPlan();
          }}>
          작성 완료
        </Button>
        <Link href={`/home`}>
          <Button
            background="primary"
            color="white-100"
            size="lg"
            border={false}
            onClick={() => {}}>
            나가기
          </Button>
        </Link>
      </div>
    </div>
  );
}
