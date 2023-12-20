'use client';

import { ReadOnlyRemindItem } from '@/components';
import DebounceSwitchButton from '@/components/DebounceSwitchButton/DebounceSwitchButton';
import {
  DATE_OPTIONS,
  TERM_OPTIONS,
  TIME_OPTIONS,
  TOTAL_PERIOD_OPTIONS,
} from '@/constants/remindOptions';
import { useGetRemindQuery } from '@/hooks/apis/useGetRemindQuery';
import { useToggleIsRemindableMutation } from '@/hooks/apis/useToggleIsRemindable';
import { RemindOptionObjectType } from '@/types/Remind';
import { changeRemindTimeToNumber } from '@/utils/changeRemindTimeToNumber';
import { checkIsSeason } from '@/utils/checkIsSeason';
import classNames from 'classnames';
import React from 'react';
import './index.scss';

interface ReadOnlyRemindProps {
  planId: string;
}

// 선택된 리마인드 옵션에 따라 이에 해당하는 text를 return 해주는 함수
const makeRemindOptionToString = (
  remindOptions: RemindOptionObjectType[],
  selectedValue: number,
) => {
  const selectedOptions = remindOptions.filter((option) => {
    return option.value === selectedValue;
  });

  return selectedOptions.length === 1 ? selectedOptions[0].name : '';
};

export default function ReadOnlyRemind({ planId }: ReadOnlyRemindProps) {
  // 리마인드 정보 조회 API 호출해서 받아온 data
  const { remindData } = useGetRemindQuery(
    parseInt(planId, 10),
    checkIsSeason(),
  );

  const { mutate: toggleIsRemindableAPI } = useToggleIsRemindableMutation(
    parseInt(planId, 10),
  );

  const handleToggleIsRemindable = () => {
    toggleIsRemindableAPI(parseInt(planId, 10));
  };

  return (
    <div className={classNames('readonly-remind')}>
      <div className={classNames('readonly-remind__header')}>
        <span className={classNames('readonly-remind__header__title')}>
          리마인드
        </span>
        <DebounceSwitchButton
          defaultIsOn={remindData.isRemindable}
          submitToggleAPI={handleToggleIsRemindable}
          toggleName="remind"
        />
      </div>

      <div className={classNames('readonly-remind__options')}>
        <span className={classNames('readonly-remind__options__option')}>
          {makeRemindOptionToString(
            TOTAL_PERIOD_OPTIONS,
            remindData.remindTotalPeriod,
          )}
        </span>
        <span className={classNames('readonly-remind__options__text')}>
          동안
        </span>

        <span className={classNames('readonly-remind__options__option')}>
          {makeRemindOptionToString(TERM_OPTIONS, remindData.remindTerm)}
        </span>
        <span>마다 매달</span>

        <span className={classNames('readonly-remind__options__option')}>
          {makeRemindOptionToString(DATE_OPTIONS, remindData.remindDate)}
        </span>
        <span className={classNames('readonly-remind__options__option')}>
          {makeRemindOptionToString(
            TIME_OPTIONS,
            changeRemindTimeToNumber(remindData.remindTime),
          )}
        </span>
        <span className={classNames('readonly-remind__options__text')}>
          에 리마인드를 받고 있어요 !
        </span>
      </div>

      <ul className={classNames('readonly-remind__message__list')}>
        {remindData.sentRemindResponses &&
          remindData.sentRemindResponses.map((item, index) => {
            return (
              <ReadOnlyRemindItem
                key={index}
                data={item}
                planId={parseInt(planId, 10)}
                classNameList={['readonly-remind__message__item']}
              />
            );
          })}
        {remindData.futureRemindResponses &&
          remindData.futureRemindResponses.map((item, index) => {
            return (
              <ReadOnlyRemindItem
                key={index}
                data={item}
                planId={parseInt(planId, 10)}
                classNameList={['readonly-remind__message__item']}
              />
            );
          })}
      </ul>
    </div>
  );
}
