'use client';

import { useAllPlansQuery } from '@/hooks/apis/plans/useAllPlansQuery';
import { SortType } from '@/types/apis/plan/GetAllPlans';
import classNames from 'classnames';
import { useMemo, useState } from 'react';
import Plans from './Plans/Plans';
import Tab from './Tab/Tab';
import './index.scss';

export default function ExplorePlans() {
  const [sortCondition, setSortCondition] = useState<SortType>('createdAt');
  const [isNewYear, setIsNewYear] = useState(true);
  const { loadedPlans, fetchNextPage, hasNextPage, isLoading, isError } =
    useAllPlansQuery({
      sortCondition,
      isNewYear,
      pageSize: 1,
    });
  const flatLoadedPlans = useMemo(() => loadedPlans.flat(), [loadedPlans]);
  console.log('loadedPlans:', loadedPlans);
  console.log('flatLoadedPlans:', flatLoadedPlans);
  const handleSort = (condition: SortType) => {
    setSortCondition(condition);
  };
  const handleYear = (isNewYear: boolean) => {
    setIsNewYear(isNewYear);
  };
  console.log('hasNextPage:', hasNextPage);
  console.log('isLoading:', isLoading);
  console.log('isError:', isError);
  fetchNextPage();
  return (
    <div className={classNames('explore-plans__wrapper')}>
      <Tab handleSort={handleSort} handleYear={handleYear} />
      <Plans flatLoadedPlans={flatLoadedPlans} />
    </div>
  );
}
