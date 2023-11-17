'use client';

import { Dropdown } from '@/components';
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
  const maxLength = 4;
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
      <div className={classNames(`home__wrapper-dropdown`)}>
        <Dropdown
          options={PERIOD_OPTIONS}
          selectedValue={period}
          setSelectedValue={setPeriod}
        />
      </div>
      <div
        className={classNames(
          `home__wrapper--year`,
          `font-size-3xl`,
          `color-origin-gray-300`,
        )}>
        {period}년 나의 계획은?
      </div>
      <ProgressBar percent={50} />
      <div
        className={classNames(
          `home__wrapper--year`,
          `font-size-base`,
          `color-origin-gray-200`,
        )}>
        전체 달성률 : {50}%
      </div>
      <div className={classNames('home__plans')}>
        {yearData.getPlanList.map((plan, index) => {
          return (
            <Plan
              key={index}
              title={plan.title}
              achieveRate={plan.achieveRate}
              icon={plan.icon}
            />
          );
        })}
        {Array.from(
          { length: maxLength - yearData.getPlanList.length },
          (_, i) => {
            return <NewPlan key={i} />;
          },
        )}
      </div>
    </>
  );
}
