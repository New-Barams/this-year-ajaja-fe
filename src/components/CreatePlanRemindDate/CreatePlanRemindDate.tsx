'use client';

import { Dropdown } from '@/components';
import { SESSION_STORAGE_KEY } from '@/constants';
import {
  DATE_OPTIONS,
  TERM_OPTIONS,
  TIME_OPTIONS,
  TOTAL_PERIOD_OPTIONS,
} from '@/constants/remindOptions';
import { useSessionStorage } from '@/hooks/useSessionStorage';
import { RemindOptionType } from '@/types/Remind';
import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo } from 'react';
import './index.scss';

interface CreatePlanRemindDateProps {
  isCreateOrEditPage: 'create' | 'edit';
}

export default function CreatePlanRemindDate({
  isCreateOrEditPage,
}: CreatePlanRemindDateProps) {
  const [remindOptions, setRemindOptions] = useSessionStorage<RemindOptionType>(
    {
      key:
        isCreateOrEditPage === 'create'
          ? SESSION_STORAGE_KEY.STEP_3
          : SESSION_STORAGE_KEY.EDIT_REMIND_OPTION,
      initialValue: {
        TotalPeriod: 12,
        Term: 1,
        Date: 1,
        Time: 9,
      },
      setSessionValueAtFirst: true,
    },
  );

  const handleChangeRemindOption = useCallback(
    (optionKey: string, newOptionValue: number) => {
      setRemindOptions({
        ...remindOptions,
        [optionKey]: newOptionValue,
      });
    },
    [remindOptions, setRemindOptions],
  );

  const filteredTermOptions = useMemo(() => {
    return TERM_OPTIONS.filter(
      (option) => option.value <= remindOptions.TotalPeriod,
    );
  }, [remindOptions.TotalPeriod]);

  useEffect(() => {
    if (remindOptions.Term > remindOptions.TotalPeriod) {
      handleChangeRemindOption('Term', 1);
    }
  }, [remindOptions.TotalPeriod, remindOptions.Term, handleChangeRemindOption]);

  return (
    <div className={classNames(['create-remind-date'])}>
      <p className={classNames(['create-remind-date__title'])}>
        1년 중, 리마인드를 받고 싶은 날짜를 정해보세요!
      </p>

      <div className={classNames(['create-remind-date__option'])}>
        <p>몇 개월 동안 리마인드를 받고 싶으세요?</p>
        <div className={classNames(['create-remind-date__option__answer'])}>
          <Dropdown
            dropdownId="remindPeriodDropdown"
            options={TOTAL_PERIOD_OPTIONS}
            selectedValue={remindOptions.TotalPeriod}
            setSelectedValue={(newSelectedValue: number) => {
              handleChangeRemindOption('TotalPeriod', newSelectedValue);
            }}
            classNameList={['dropdown__remind-option__first']}
          />
          <span>동안 받을래요!</span>
        </div>
      </div>

      <div className={classNames(['create-remind-date__option'])}>
        <p>몇 개월 주기로 리마인드를 받고 싶으세요?</p>
        <div className={classNames(['create-remind-date__option__answer'])}>
          <Dropdown
            dropdownId="remindTermDropdown"
            options={filteredTermOptions}
            selectedValue={remindOptions.Term}
            setSelectedValue={(newSelectedValue: number) => {
              handleChangeRemindOption('Term', newSelectedValue);
            }}
            classNameList={['dropdown__remind-option__second']}
          />
          <span>마다 받을래요!</span>
        </div>
      </div>

      <div className={classNames(['create-remind-date__option'])}>
        <p>매달 몇 일에 리마인드를 받고 싶으세요?</p>
        <div className={classNames(['create-remind-date__option__answer'])}>
          <Dropdown
            dropdownId="remindDateDropdown"
            options={DATE_OPTIONS}
            selectedValue={remindOptions.Date}
            setSelectedValue={(newSelectedValue: number) => {
              handleChangeRemindOption('Date', newSelectedValue);
            }}
            classNameList={['dropdown__remind-option__third']}
          />
          <span>에 받을래요!</span>
        </div>
      </div>

      <div className={classNames(['create-remind-date__option'])}>
        <p>어느 시간에 리마인드를 받고 싶으세요?</p>
        <div className={classNames(['create-remind-date__option__answer'])}>
          <Dropdown
            dropdownId="remindTimeDropdown"
            options={TIME_OPTIONS}
            selectedValue={remindOptions.Time}
            setSelectedValue={(newSelectedValue: number) => {
              handleChangeRemindOption('Time', newSelectedValue);
            }}
            classNameList={[]}
          />
          <span>에 받을래요!</span>
        </div>
      </div>
    </div>
  );
}
