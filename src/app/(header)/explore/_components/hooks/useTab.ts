import { TabProps } from '@/types/Tab';
import { useState } from 'react';

export const useTab = ({ handleSort, handleYear }: TabProps) => {
  const [currentYearTab, setCurrentYearTab] = useState(0);
  const [currentSortTab, setCurrentSortTab] = useState(0);
  const selectYearMenuHandler = (index: number) => {
    setCurrentYearTab(index);
    handleYear(index === 0 ? true : false);
  };
  const selectSortMenuHandler = (index: number) => {
    setCurrentSortTab(index);
    handleSort(index === 0 ? 'latest' : 'ajaja');
  };
  return {
    currentYearTab,
    setCurrentYearTab,
    currentSortTab,
    setCurrentSortTab,
    selectYearMenuHandler,
    selectSortMenuHandler,
  };
};
