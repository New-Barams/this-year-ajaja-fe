'use client';

import { WritableRemind } from '@/components';
import classNames from 'classnames';
import { useState } from 'react';
import './index.scss';

type remindOptionType = {
  TotalPeriod: number;
  Term: number;
  Date: number;
  Time: number;
};

// 로그인 여부 판단해서 로그인 x => 로그인 페이지로 redirect
// 시즌인지 여부 판단해서 시즌 x => /home으로 redirect?

export default function CreatePage() {
  // 리마인드 알림 여부 state => 원래는 서버에서 받아올 것
  const [isRemindOn, setIsRemindOn] = useState(true);
  const toggleIsRemindOn = () => {
    setIsRemindOn(!isRemindOn);
    console.log('리마인드 알림 여부 toggle');
  };

  // 리마인드 옵션 4개 => 기본값은 서버에서 받아올 것
  const [remindOptions, setRemindOptions] = useState<remindOptionType>({
    TotalPeriod: 12,
    Term: 1,
    Date: 15,
    Time: 9,
  });

  const handleChangeRemindOption = (
    // 솔직히 이거 근데 잘 될지 모르겠음
    optionKey: string,
    newOptionValue: number,
  ) => {
    setRemindOptions({
      ...remindOptions,
      [optionKey]: newOptionValue,
    });
    console.log(
      `리마인드 옵션 변경 ${optionKey}의 data ${newOptionValue}로 변경`,
    );
  };

  const fixRemindOptions = () => {
    // 1. 현재 remindOption 4개를 기반으로 새로운 리마인드 받는 특정 날짜 배열 생성
    // 2. 각 날짜에 대한 메세지 값을 빈 string ""로 설정
    // 3. 이렇게 만들어진 배열로 update
    console.log('확정 버튼 클릭으로 인한 날짜 변경 ');
  };

  const [remindMessageList, setRemindMessageList] = useState([
    { date: { month: 3, day: 2 }, message: '1번 리마인드 메세지' },
    { date: { month: 6, day: 2 }, message: '2번 리마인드 메세지' },
    { date: { month: 9, day: 2 }, message: '3번 리마인드 메세지' },
  ]);

  // month, day에 해당하는 리마인드 날짜에 대한 message를 업데이트해주는 함수
  const handleChangeRemindMessage = (
    month: number,
    day: number,
    newMessage: string,
  ) => {
    const newRemindList = remindMessageList.map((item) => {
      // month와 day가 일치하는 요소의 message를 업데이트
      if (item.date.month === month && item.date.day === day) {
        return { ...item, message: newMessage };
      }
      // 일치하지 않는 경우 기존 요소를 그대로 반환
      return item;
    });

    setRemindMessageList(newRemindList);
    console.log(
      `${month}월 ${day}일에 대한 리마인드 메세지 ${newMessage}로 변경`,
    );
  };

  // 동일한 리마인드 메세지 받도록 만들어주는 함수
  const makeAllRemindMessageSame = () => {
    if (remindMessageList.length <= 1) {
      return;
    }

    const firstRemindMessage = remindMessageList[0].message;
    const updatedList = remindMessageList.map((item) => {
      return { ...item, message: firstRemindMessage };
    });
    setRemindMessageList(updatedList);

    console.log(`모든 메세지 동일하게 설정`);
  };

  return (
    <div className={classNames('create-page')}>
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
    </div>
  );
}
