import { IconSwitchButton, ReadOnlyRemindItem } from '@/components';
import { ReadOnlyRemindType, RemindOptionsTypes } from '@/types/Remind';
import classNames from 'classnames';
import React from 'react';
import { useState } from 'react';
import {
  DATE_OPTIONS,
  TERM_OPTIONS,
  TIME_OPTIONS,
  TOTAL_PERIOD_OPTIONS,
} from './../constants/remindOptions';

interface ReadOnlyRemindProps {
  data: ReadOnlyRemindType;
}

// 선택된 리마인드 옵션에 따라 이에 해당하는 text를 return 해주는 함수
export const makeRemindOptionToString = (
  remindOptions: RemindOptionsTypes[],
  selectedValue: number,
) => {
  const selectedOptions = remindOptions.filter((option) => {
    return option.value === selectedValue;
  });

  return selectedOptions.length === 1 ? selectedOptions[0].name : '';
};

// 내 계획 상세 페이지(시즌, 비시즌) 에서 사용되는 컴포넌트
export default function ReadOnlyRemind({ data }: ReadOnlyRemindProps) {
  // useParams 통해서 planId 가져와서 이 planId를 넣어줘서 리마인드 알림 여부 API를 호출해줘야 함
  const {
    isRemindable,
    remindTime,
    remindDate,
    remindTerm,
    remindTotalPeriod,
    remindMessageList,
  } = data;

  const [isRemindOn, toggleIsRemindOn] = useState(isRemindable);

  return (
    <div className={classNames('readonly-remind')}>
      <div className={classNames('readonly-remind__header')}>
        <span className={classNames('readonly-remind__header__title')}>
          리마인드
        </span>
        <IconSwitchButton
          onIconName="NOTIFICATION_ON"
          offIconName="NOTIFICATION_OFF"
          onClick={toggleIsRemindOn(true)!}
          isActive={isRemindOn!}
        />
        <span className={classNames('readonly-remind__header__toggle')}>
          {isRemindOn ? '리마인드 알림 활성화' : '리마인드 알림 비활성화'}
        </span>
      </div>

      <div className={classNames('readonly-remind__options')}>
        <span className={classNames('readonly-remind--options__option')}>
          {makeRemindOptionToString(TOTAL_PERIOD_OPTIONS, remindTotalPeriod)}
        </span>
        <span className={classNames('readonly-remind--options__text')}>
          동안
        </span>

        <span className={classNames('readonly-remind--options__option')}>
          {makeRemindOptionToString(TERM_OPTIONS, remindTerm)}
        </span>
        <span className={classNames('readonly-remind--options__text')}>
          마다 매달
        </span>

        <span className={classNames('readonly-remind--options__option')}>
          {makeRemindOptionToString(DATE_OPTIONS, remindDate)}
        </span>
        <span className={classNames('readonly-remind--options__option')}>
          {makeRemindOptionToString(TIME_OPTIONS, remindTime)}
        </span>
        <span className={classNames('readonly-remind--options__text')}>
          에 리마인드를 받고 있어요 !
        </span>
      </div>

      {remindMessageList.length !== 0 && (
        <ul className={classNames('readonly-remind__message__list')}>
          {remindMessageList.map((item, index) => {
            return <ReadOnlyRemindItem key={index} data={item} />;
          })}
        </ul>
      )}
    </div>
  );
}
