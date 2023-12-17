'use client';

import { useGetMyPlansQuery } from '@/hooks/apis/useGetMyPlansQuery';
import { checkThisYear } from '@/utils/checkThisYear';
import classNames from 'classnames';
import MyPlan from './_components/MyPlan';
import './_components/index.scss';

export default function HomePage() {
  const { myPlans } = useGetMyPlansQuery();

  if (!myPlans.data.length || myPlans.data[0].year !== checkThisYear()) {
    myPlans.data.unshift({
      year: checkThisYear(),
      totalAchieveRate: 0,
      getPlanList: [],
    });
  }

  return (
    <>
      <div className={classNames(`home__wrapper`)}>
        <MyPlan myPlans={myPlans} />
      </div>
    </>
  );
}
