'use client';

import { useAllPlansQuery } from '@/hooks/apis/plans/useAllPlansQuery';
import classNames from 'classnames';
import Plans from './Plans/Plans';
import Tab from './Tab/Tab';
import './index.scss';

export default function ExplorePlans() {
  const { allPlans } = useAllPlansQuery({
    sortCondition: 'ajaja',
    isNewYear: true,
    pageSize: 5,
  });
  return (
    <div className={classNames('explore-plans__wrapper')}>
      <Tab />
      <Plans allPlans={allPlans} />
    </div>
  );
}
