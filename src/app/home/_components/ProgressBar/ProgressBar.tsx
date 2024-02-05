'use client';

import { ProgressBarProps } from '@/types';
import classNames from 'classnames';
import { useProgressBar } from '../hooks';
import './index.scss';

export default function ProgressBar({ percent: Maxpercent }: ProgressBarProps) {
  const { percent } = useProgressBar({ percent: Maxpercent });

  return (
    <div className={classNames('progress__wrapper', 'border-round')}>
      <progress
        className={classNames('progress')}
        value={percent}
        max={100}></progress>
    </div>
  );
}
