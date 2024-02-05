'use client';

import classNames from 'classnames';
import MyPlan from './_components/MyPlan';
import { useHomePage } from './_components/hooks';
import './_components/index.scss';

export default function HomePage() {
  const { myPlans } = useHomePage();

  return (
    <>
      <div className={classNames(`home__wrapper`)}>
        <MyPlan myPlans={myPlans} />
      </div>
    </>
  );
}
