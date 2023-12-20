import { planIcons } from '@/constants/planIcons';
import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';
import './index.scss';

export default function CreatePlanIconExample() {
  return (
    <div
      className={classNames(
        'example-icon-item',
        'font-size-base',
        'border-origin-secondary',
        'border-round',
      )}>
      <Image
        src={`/animal/${planIcons[2]}.png`}
        width={90}
        height={90}
        alt="example plan icon"
        className={classNames('example-icon-item__image')}
      />

      <div
        className={classNames(
          `example-icon-item__text`,
          `color-origin-text-100`,
        )}>
        <p
          className={classNames(
            `example-icon-item__text__title`,
            'font-size-md',
          )}>
          2024년 계획
        </p>
        <p
          className={classNames(
            'example-icon-item__text__rate',
            'font-size-base',
          )}>
          달성률: 100%
        </p>
      </div>
    </div>
  );
}
