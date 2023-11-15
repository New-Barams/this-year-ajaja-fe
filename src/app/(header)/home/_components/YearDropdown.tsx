'use client';

import { Dropdown } from '@/components';
import classNames from 'classnames';
import { useState } from 'react';

export default function YearDropdown() {
  const [period, setPeriod] = useState(2024);

  const PERIOD_OPTIONS = [
    { value: 2024, name: '2024년 계획' },
    { value: 2023, name: '2023년 계획' },
  ];
  return (
    <>
      <div className={classNames(`home__wrapper-dropdown`)}>
        <Dropdown
          options={PERIOD_OPTIONS}
          selectedValue={period}
          setSelectedValue={setPeriod}
        />
      </div>
      <div
        className={classNames(
          `home__wrapper--year`,
          `font-size-3xl`,
          `color-origin-gray-300`,
        )}>
        {period}년 나의 계획은?
      </div>
    </>
  );
}
