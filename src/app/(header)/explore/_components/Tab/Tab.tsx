'use client';

import classNames from 'classnames';
import { useState } from 'react';
import './index.scss';

export default function Tab() {
  const [currentTab, setCurrentTab] = useState(0);

  const menu = [
    { name: '새해' },
    {
      name: '지난해',
    },
  ];

  const selectMenuHandler = (index: number) => {
    setCurrentTab(index);
    console.log(index);
  };
  return (
    <div className={classNames('tab__wrapper')}>
      <div className={classNames('tab__wrapper-year')}>
        <div className={classNames('tab__menu')}>
          {menu.map((el, index) => {
            return (
              <li
                key={index}
                className={classNames(
                  'tab__menu--align',
                  index === currentTab
                    ? 'tab__menu--focused'
                    : 'tab__menu--normal',
                )}
                onClick={() => selectMenuHandler(index)}>
                {el.name}
                <div
                  className={classNames(
                    'tab__menu--underline',
                    index === currentTab
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
    </div>
  );
}
