'use client';

import { Dropdown } from '@/components';
import {
  DATE_OPTIONS,
  TERM_OPTIONS,
  TIME_OPTIONS,
  TOTAL_PERIOD_OPTIONS,
} from '@/constants/components/remindOptions';
import { useSessionStorage } from '@/hooks/useSessionStorage';
import { RemindOptionType } from '@/types/components/Remind';
import React, { useCallback, useEffect, useMemo } from 'react';

export default function CreatePlanRemindDate() {
  const [remindOptions, setRemindOptions] = useSessionStorage<RemindOptionType>(
    {
      key: 'createPlan-remindDate',
      initialValue: {
        TotalPeriod: 12,
        Term: 3,
        Date: 1,
        Time: 9,
      },
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
    <div>
      <div>1년 중, 리마인드를 받고 싶은 날짜를 정해보세요 !</div>

      <div>몇 개월 동안 리마인드를 받고 싶으세요?</div>
      <div>
        <Dropdown
          dropdownId="remindPeriodDropdown"
          options={TOTAL_PERIOD_OPTIONS}
          selectedValue={remindOptions.TotalPeriod}
          setSelectedValue={(newSelectedValue: number) => {
            handleChangeRemindOption('TotalPeriod', newSelectedValue);
          }}
          classNameList={[]}
        />
        <span>동안 리마인드를 받을래요 !</span>
      </div>

      <div>몇 개월 주기로 리마인드를 받고 싶으세요?</div>
      <div>
        <Dropdown
          dropdownId="remindTermDropdown"
          options={filteredTermOptions}
          selectedValue={remindOptions.Term}
          setSelectedValue={(newSelectedValue: number) => {
            handleChangeRemindOption('Term', newSelectedValue);
          }}
          classNameList={[]}
        />
        <span>마다 리마인드를 받을래요 !</span>
      </div>

      <div>매달 몇 일에 리마인드를 받고 싶으세요?</div>
      <div>
        <Dropdown
          dropdownId="remindDateDropdown"
          options={DATE_OPTIONS}
          selectedValue={remindOptions.Date}
          setSelectedValue={(newSelectedValue: number) => {
            handleChangeRemindOption('Date', newSelectedValue);
          }}
          classNameList={[]}
        />
        <span>에 리마인드를 받을래요 !</span>
      </div>

      <div>어느 시간에 리마인드를 받고 싶으세요?</div>
      <div>
        <Dropdown
          dropdownId="remindTimeDropdown"
          options={TIME_OPTIONS}
          selectedValue={remindOptions.Time}
          setSelectedValue={(newSelectedValue: number) => {
            handleChangeRemindOption('Time', newSelectedValue);
          }}
          classNameList={[]}
        />
        <span>에 리마인드를 받을래요 !</span>
      </div>
    </div>
  );
}
