'use client';

import { Dropdown } from '@/components';
import { maxPlan } from '@/constants/plan';
import { planIcons } from '@/constants/planIcons';
import { GetMyPlansResponse } from '@/types/apis/plan/GetMyPlans';
import { checkThisYear } from '@/utils/checkThisYear';
import classNames from 'classnames';
import Image from 'next/image';
import NewPlan from './NewPlan/NewPlan';
import Plan from './Plan/Plan';
import ProgressBar from './ProgressBar/ProgressBar';
import { useMyPlan } from './hooks';

export default function MyPlan({ myPlans }: { myPlans: GetMyPlansResponse }) {
  const { PERIOD_OPTIONS, setYear, year, yearData, yearDataLength } = useMyPlan(
    { myPlans },
  );
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
          ({yearDataLength}/{maxPlan})
        </p>
      </div>
    </>
  );
}
