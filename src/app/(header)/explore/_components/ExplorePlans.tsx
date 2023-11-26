'use client';

import { useAllPlansQuery } from '@/hooks/apis/plans/useAllPlansQuery';
import { SortType } from '@/types/apis/plan/GetAllPlans';
import classNames from 'classnames';
import { useState } from 'react';
import Plans from './Plans/Plans';
import Tab from './Tab/Tab';
import './index.scss';

type ExplorePlansProps = {
  isLogin: boolean;
};

export default function ExplorePlans({ isLogin }: ExplorePlansProps) {
  const [sortCondition, setSortCondition] = useState<SortType>('createdAt');
  const [isNewYear, setIsNewYear] = useState(true);
  const { allPlans } = useAllPlansQuery({
    sortCondition,
    isNewYear,
    pageSize: 5,
  });
  const handleSort = (condition: SortType) => {
    setSortCondition(condition);
  };
  const handleYear = (isNewYear: boolean) => {
    setIsNewYear(isNewYear);
  };

  return (
    <div className={classNames('explore-plans__wrapper')}>
      <Tab handleSort={handleSort} handleYear={handleYear} />
      <Plans allPlans={allPlans} isLogin={isLogin} />
    </div>
  );
}
