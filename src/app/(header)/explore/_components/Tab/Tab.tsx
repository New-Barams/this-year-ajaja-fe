'use client';

import { SortType } from '@/types/apis/plan/GetAllPlans';
import classNames from 'classnames';
import { useState } from 'react';
import React from 'react';
import './index.scss';

type TabProps = {
  handleSort: (condition: SortType) => void;
  handleYear: (isNewYear: boolean) => void;
};

export default function Tab({ handleSort, handleYear }: TabProps) {
  const [currentYearTab, setCurrentYearTab] = useState(0);
  const [currentSortTab, setCurrentSortTab] = useState(0);

  const yearMenu = [
    { name: '새해' },
    {
      name: '지난해',
    },
  ];
  const sortMenu = [{ name: '최신순' }, { name: '인기순' }];

  const selectYearMenuHandler = (index: number) => {
    setCurrentYearTab(index);
    handleYear(index === 0 ? true : false);
  };
  const selectSortMenuHandler = (index: number) => {
    setCurrentSortTab(index);
    handleSort(index === 0 ? 'latest' : 'ajaja');
  };
  return (
    <div className={classNames('tab__wrapper')}>
      <div className={classNames('tab__wrapper-year')}>
        <div className={classNames('tab__year-menu')}>
          {yearMenu.map((el, index) => {
            return (
              <li
                key={index}
                className={classNames(
                  'tab__year-menu--align',
                  index === currentYearTab
                    ? 'tab__year-menu--focused'
                    : 'tab__year-menu--normal',
                )}
                onClick={() => selectYearMenuHandler(index)}>
                {el.name}
                <div
                  className={classNames(
                    'tab__year-menu--underline',
                    index === currentYearTab
                      ? 'background-origin-primary'
                      : 'background-origin-orange-200',
                  )}
                />
              </li>
            );
          })}
        </div>
      </div>
      <div
        className={classNames('tab__line', 'background-origin-orange-200')}
      />
      <div className={classNames('tab__wrapper-sort', 'font-size-sm')}>
        {sortMenu.map((el, index) => {
          return (
            <React.Fragment key={index}>
              {!!index && (
                <p className={classNames('color-origin-gray-200')}>|</p>
              )}
              <li
                key={index}
                className={classNames(
                  'tab__sort-menu--align',
                  index === currentSortTab
                    ? 'tab__sort-menu--focused'
                    : 'tab__sort-menu--normal',
                )}
                onClick={() => selectSortMenuHandler(index)}>
                {el.name}
              </li>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
