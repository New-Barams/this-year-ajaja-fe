'use client';

import { Dropdown } from '@/components';
import { planIcons } from '@/constants/planIcons';
import { GetMyPlansResponse } from '@/types/apis/plan/GetMyPlans';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import NewPlan from './NewPlan/NewPlan';
import Plan from './Plan/Plan';
import ProgressBar from './ProgressBar/ProgressBar';

type MyPlanProps = {
  myPlans: GetMyPlansResponse;
};

export default function MyPlan({ myPlans }: MyPlanProps) {
  const maxLength = 2;
  const { data: myPlansData } = myPlans;
  const yearList = myPlansData.map((x) => x.year);
  const [period, setPeriod] = useState(yearList[0]);
  const [yearData, setYearData] = useState(myPlansData[0]);
  const PERIOD_OPTIONS = yearList.map((x) => {
    return { value: x, name: `${x}년 계획` };
  });

  useEffect(() => {
    setYearData(myPlansData.find((x) => x.year === period)!);
  }, [period, myPlansData]);
  return (
    <>
      <div className={classNames('home__header')}>
        <div className={classNames(`home__header-dropdown`)}>
          <Dropdown
            dropdownId="homePageDropdown"
            options={PERIOD_OPTIONS}
            selectedValue={period}
            setSelectedValue={setPeriod}
          />
        </div>
        <div
          className={classNames(
            `home__header--year`,
            `font-size-lg`,
            `color-origin-text-100`,
          )}>
          {period}년 나의 계획은?
        </div>
        <ProgressBar percent={yearData.totalAchieveRate} />
        <div
          className={classNames(
            `home__header--total`,
            `font-size-base`,
            `color-origin-text-100`,
          )}>
          전체 달성률 : {yearData.totalAchieveRate}%
        </div>
      </div>
      <div className={classNames('home__plans')}>
        {yearData.getPlanList.map((plan, index) => {
          return (
            <Plan
              key={index}
              title={plan.title}
              planId={plan.planId}
              achieveRate={plan.achieveRate}
              photoUrl={`/animal/${planIcons[plan.icon]}.png`}
            />
          );
        })}
        <NewPlan
          maxLength={maxLength}
          currentLength={yearData.getPlanList.length}
        />
      </div>
    </>
  );
}
