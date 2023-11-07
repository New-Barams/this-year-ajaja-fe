import { Icon } from '@/components';
import React from 'react';
import './index.scss';

type optionsType = {
  value: number;
  name: string;
};

interface DropdownProps {
  options: optionsType[];
  defaultValue: string; // 외부에 존재하는 state를 dropdown에서 선택된 value로 업데이트 시켜주는 핸들러
}

export default function Dropdown({ options, defaultValue }: DropdownProps) {
  return (
    <div className="dropdown__container">
      <input id="dropdown" className="dropdown__checkbox" type="checkbox" />
      <label className="dropdown__label" htmlFor="dropdown">
        <div className="dropdown__label__text">{defaultValue}</div>
        <Icon
          size="4xl"
          name="DROP_DOWN"
          classNameList={['dropdown__label__icon']}
        />
      </label>

      <div className="dropdown__content">
        <ul className="dropdown__content__list">
          {options.map((option) => {
            return (
              <li className="dropdown__content__item" key={option.value}>
                {option.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
