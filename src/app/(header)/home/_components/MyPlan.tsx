'use client';

import { Dropdown } from '@/components';
import { planIcons } from '@/constants/planIcons';
import { canMakeNewPlanStore } from '@/stores/canMakeNewPlanStore';
import { GetMyPlansResponse } from '@/types/apis/plan/GetMyPlans';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
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
  const [year, setYear] = useState(yearList[0]);
  const [yearData, setYearData] = useState(myPlansData[0]);
  const [yearDataLength, setYearDataLength] = useState(
    myPlansData[0].getPlanList.length,
  );
  const [, setCanMakeNewPlan] = useRecoilState(canMakeNewPlanStore);
  const PERIOD_OPTIONS = yearList.map((x) => {
    return { value: x, name: `${x}년 계획` };
  });

  useEffect(() => {
    const chosenYearData = myPlansData.find((x) => x.year === year)!;
    setYearData(chosenYearData);
    setYearDataLength(chosenYearData.getPlanList.length);
    setCanMakeNewPlan(!!(maxLength - chosenYearData.getPlanList.length));
  }, [year, myPlansData, setCanMakeNewPlan, setYearDataLength]);
  return (
    <>
      <div className={classNames('home__header')}>
        <div className={classNames(`home__header-dropdown`)}>
          <Dropdown
            dropdownId="homePageDropdown"
            options={PERIOD_OPTIONS}
            selectedValue={year}
            setSelectedValue={setYear}
          />
        </div>
        <div
          className={classNames(
            `home__header--year`,
            `font-size-lg`,
            `color-origin-text-100`,
          )}>
          {year}년 나의 계획은?
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
        <NewPlan />
        <p className={classNames('home__number', 'color-origin-text-300')}>
          ({yearDataLength}/{maxLength})
        </p>
      </div>
    </>
  );
}
