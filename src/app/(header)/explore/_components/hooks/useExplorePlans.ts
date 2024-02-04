import { useAllPlansQuery } from '@/hooks/apis/useAllPlansQuery';
import { SortType } from '@/types/apis/plan/GetAllPlans';
import { useMemo, useState } from 'react';

export const useExplorePlans = () => {
  const [sort, setSort] = useState<SortType>('latest');
  const [current, setCurrent] = useState(true);
  const { loadedPlans, fetchNextPage, hasNextPage } = useAllPlansQuery({
    sort,
    current,
  });
  const flatLoadedPlans = useMemo(() => loadedPlans.flat(), [loadedPlans]);
  const handleSort = (condition: SortType) => {
    setSort(condition);
  };
  const handleYear = (isNewYear: boolean) => {
    setCurrent(isNewYear);
  };
  return {
    sort,
    setSort,
    current,
    setCurrent,
    loadedPlans,
    fetchNextPage,
    hasNextPage,
    flatLoadedPlans,
    handleSort,
    handleYear,
  };
};
