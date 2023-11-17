'use client';

import { Button, WritableRemind } from '@/components';
import { RemindItemType, RemindOptionType } from '@/types/components/Remind';
import { decideRemindDate } from '@/utils/decideRemindDate';
import classNames from 'classnames';
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
  // 계획 공개 여부, 계획 제목, 계획 내용, 태그 state 및 setter 정의해줘야 함

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
    // 1.  decideRemindDate 유틸 함수에 현재 리마인드 옵션 state를 인자로 넣어 새로운 리마인드 날짜 생성
    // 2. 각 날짜에 대한 메세지 값을 빈 string ""로 설정
    // 3. 이렇게 만들어진 배열로 리마인드 아이템들을 update
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

  // 동일한 리마인드 메세지 받도록 만들어주는 함수
  const makeAllRemindMessageSame = useCallback(() => {
    if (remindMessageList.length <= 1) {
      return;
    }

    const firstRemindMessage = remindMessageList[0].message;

    // 모든 메세지를 첫번째 리마인드 메세지와 동일하게 설정해줌.
    const updatedList = remindMessageList.map((item) => {
      return { ...item, message: firstRemindMessage };
    });

    setRemindMessageList(updatedList);
  }, [remindMessageList]);

  const createNewPlan = () => {
    // TODO: 이렇게 컴포넌트 내 state를 로직에 사용하는 함수는 하위 컴포넌트에서 호출해도 런타임 때 최신 state의 값이 사용되나 ?
    const data: createPlanData = {
      icon: 1, // 홈 페이지에서 받아와야 함
      isPublic: true, // state로 변경 필요
      title: 'title', // state로 변경 필요
      description: 'des', // state로 변경 필요
      tags: [''], // state로 변경 필요
      remindTotalPeriod: remindOptions.TotalPeriod,
      remindTerm: remindOptions.Term,
      remindDate: remindOptions.Date,
      remindTime: remindOptions.Time,
      messages: remindMessageList.map((messageItem) => {
        return messageItem.message;
      }),
    };

    console.log(`${data}`);
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

      <Button
        background="primary"
        color="white-100"
        size="lg"
        border={false}
        onClick={createNewPlan}>
        계획 생성 완료
      </Button>
    </div>
  );
}
