'use client';

import { Dropdown } from '@/components';
import { DATE_OPTIONS, TIME_OPTIONS, TOTAL_PERIOD_OPTIONS } from '@/constants';
import classNames from 'classnames';
import React from 'react';
import useCreatePlanRemindDate from './hooks/useCreatePlanRemindDate';
import './index.scss';

interface CreatePlanRemindDateProps {
  isCreateOrEditPage: 'create' | 'edit';
}

export default React.memo(function CreatePlanRemindDate({
  isCreateOrEditPage,
}: CreatePlanRemindDateProps) {
  const { remindOptions, filteredTermOptions, handleChangeRemindOption } =
    useCreatePlanRemindDate({
      isCreateOrEditPage,
    });

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
});
