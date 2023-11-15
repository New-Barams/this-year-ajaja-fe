'use client';

import classNames from 'classnames';
import { useEffect, useState } from 'react';
import './index.scss';

type ProgressBarProps = {
  percent: number;
};

export default function ProgressBar({ percent: Maxpercent }: ProgressBarProps) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((pervPercent) =>
        pervPercent < Maxpercent ? pervPercent + 1 : Maxpercent,
      );
    }, 10);

    return () => clearInterval(interval);
  }, [Maxpercent]);
  return (
    <div
      className={classNames(
        'progress__wrapper',
        'background-origin-orange-200',
        'border-round',
      )}>
      <progress
        className={classNames('progress')}
        value={percent}
        max={100}></progress>
    </div>
  );
}
