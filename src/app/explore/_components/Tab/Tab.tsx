'use client';

import { TabProps } from '@/types';
import classNames from 'classnames';
import React from 'react';
import { useTab } from '../hooks';
import './index.scss';

export default function Tab({ handleSort, handleYear }: TabProps) {
  const {
    currentSortTab,
    currentYearTab,
    selectSortMenuHandler,
    selectYearMenuHandler,
  } = useTab({ handleSort, handleYear });

  const yearMenu = [
    { name: '새해' },
    // {
    //   name: '지난해',
    // },
  ];
  const sortMenu = [{ name: '최신순' }, { name: '인기순' }];

  return (
    <div className={classNames('tab__wrapper')}>
      <div className={classNames('tab__wrapper-year')}>
        <div className={classNames('tab__year-menu', 'font-size-md')}>
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
                  className={classNames('tab__year-menu--underline', {
                    'background-origin-primary': index === currentYearTab,
                  })}
                />
              </li>
            );
          })}
        </div>
      </div>
      <div className={classNames('tab__wrapper-sort', 'font-size-base')}>
        {sortMenu.map((el, index) => {
          return (
            <React.Fragment key={index}>
              {!!index && (
                <p className={classNames('color-origin-secondary')}>|</p>
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
