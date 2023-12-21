'use client';

import { Dropdown } from '@/components';
import { planIcons } from '@/constants/planIcons';
import { useScroll } from '@/hooks/useScroll';
import { canMakeNewPlanStore } from '@/stores/canMakeNewPlanStore';
import { GetMyPlansResponse } from '@/types/apis/plan/GetMyPlans';
import { checkThisYear } from '@/utils/checkThisYear';
import classNames from 'classnames';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import NewPlan from './NewPlan/NewPlan';
import Plan from './Plan/Plan';
import ProgressBar from './ProgressBar/ProgressBar';

type MyPlanProps = {
  myPlans: GetMyPlansResponse;
};

export default function MyPlan({ myPlans }: MyPlanProps) {
  const maxLength = 4;
  const { handleScroll, scrollableRef } = useScroll();
  const { data: myPlansData } = myPlans;
  const yearList = myPlansData.map((x) => x.year);
  const [year, setYear] = useState(yearList[0]);
  const [yearData, setYearData] = useState(myPlansData[0]);
  const [yearDataLength, setYearDataLength] = useState(
    myPlansData[0].getPlanList.length,
  );
  const setCanMakeNewPlan = useSetRecoilState(canMakeNewPlanStore);
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
      <div
        className={classNames('home__plans')}
        ref={scrollableRef}
        onScroll={handleScroll}>
        {checkThisYear() === year && !yearData.getPlanList.length ? (
          <div className={classNames('home__plans--empty')}>
            <Image src={'/animal/cat.png'} alt="cat" width={100} height={100} />
            <p>작성된 계획이 없습니다.</p>
            <p>아래 버튼을 눌러 새로운 신년 계획을 만들어보세요!</p>
          </div>
        ) : (
          <>
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
          </>
        )}
        <NewPlan />
        <p className={classNames('home__number', 'color-origin-text-300')}>
          ({yearDataLength}/{maxLength})
        </p>
      </div>
    </>
  );
}
