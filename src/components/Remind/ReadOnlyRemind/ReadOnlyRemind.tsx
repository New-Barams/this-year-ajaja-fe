'use client';

import { ReadOnlyRemindItem } from '@/components';
import DebounceSwitchButton from '@/components/DebounceSwitchButton/DebounceSwitchButton';
import { RemindData, RemindOptionObjectType } from '@/types/components/Remind';
import classNames from 'classnames';
import React from 'react';
import {
  DATE_OPTIONS,
  TERM_OPTIONS,
  TIME_OPTIONS,
  TOTAL_PERIOD_OPTIONS,
} from '@constants/components/remindOptions';
import './index.scss';

interface ReadOnlyRemindProps {
  planId: string;
}

// 선택된 리마인드 옵션에 따라 이에 해당하는 text를 return 해주는 함수
export const makeRemindOptionToString = (
  remindOptions: RemindOptionObjectType[],
  selectedValue: number,
) => {
  const selectedOptions = remindOptions.filter((option) => {
    return option.value === selectedValue;
  });

  return selectedOptions.length === 1 ? selectedOptions[0].name : '';
};

// 내 계획 상세 페이지(시즌, 비시즌) 에서 사용되는 컴포넌트
export default function ReadOnlyRemind({ planId }: ReadOnlyRemindProps) {
  // 리마인드 정보 조회 API 호출해서 받아온 data
  const data: RemindData = {
    isRemindable: true,
    remindTime: 9,
    remindDate: 1,
    remindTerm: 1,
    remindTotalPeriod: 12,
    remindMessageList: [
      {
        remindMonth: 3,
        remindDate: 15,
        remindMessage: '리마인드 받았지만 만료되서 피드백 0%로 처리 ',
        isReminded: true,
        isFeedback: false,
        feedbackId: 12,
        rate: 0,
        isExpired: true,
        endMonth: 12,
        endDate: 1,
      },
      {
        remindMonth: 6,
        remindDate: 15,
        remindMessage: '리마인드 받아서 피드백함',
        isReminded: true,
        isFeedback: true,
        feedbackId: 12,
        rate: 75,
        isExpired: true,
        endMonth: 12,
        endDate: 1,
      },
      {
        remindMonth: 9,
        remindDate: 15,
        remindMessage: '예시',
        isReminded: true,
        isFeedback: false,
        feedbackId: 12,
        rate: 0,
        isExpired: false,
        endMonth: 12,
        endDate: 1,
      },
      {
        remindMonth: 12,
        remindDate: 15,
        remindMessage: '예시',
        isReminded: false,
        isFeedback: false,
        feedbackId: 12,
        rate: 0,
        isExpired: false,
        endMonth: 12,
        endDate: 1,
      },
    ],
  };

  const {
    isRemindable,
    remindTime,
    remindDate,
    remindTerm,
    remindTotalPeriod,
    remindMessageList,
  } = data;

  const handleToggleIsRemindable = () => {
    console.log(`${planId}에 대한 리마인드 알림 여부 toggle API호출 `);
  };

  return (
    <div className={classNames('readonly-remind')}>
      <div className={classNames('readonly-remind__header')}>
        <span className={classNames('readonly-remind__header__title')}>
          리마인드
        </span>
        <DebounceSwitchButton
          defaultIsOn={isRemindable}
          submitToggleAPI={handleToggleIsRemindable}
          toggleName="remind"
        />
      </div>

      <div className={classNames('readonly-remind__options')}>
        <span className={classNames('readonly-remind__options__option')}>
          {makeRemindOptionToString(TOTAL_PERIOD_OPTIONS, remindTotalPeriod)}
        </span>
        <span className={classNames('readonly-remind__options__text')}>
          동안
        </span>

        <span className={classNames('readonly-remind__options__option')}>
          {makeRemindOptionToString(TERM_OPTIONS, remindTerm)}
        </span>
        <span>마다 매달</span>

        <span className={classNames('readonly-remind__options__option')}>
          {makeRemindOptionToString(DATE_OPTIONS, remindDate)}
        </span>
        <span className={classNames('readonly-remind__options__option')}>
          {makeRemindOptionToString(TIME_OPTIONS, remindTime)}
        </span>
        <span className={classNames('readonly-remind__options__text')}>
          에 리마인드를 받고 있어요 !
        </span>
      </div>

      {remindMessageList.length !== 0 && (
        <ul className={classNames('readonly-remind__message__list')}>
          {remindMessageList.map((item, index) => {
            return (
              <ReadOnlyRemindItem
                key={index}
                data={item}
                classNameList={['readonly-remind__message__item']}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}
