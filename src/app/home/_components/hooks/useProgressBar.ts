import { ProgressBarProps } from '@/types';
import { useEffect, useState } from 'react';

export default function useProgressBar({
  percent: Maxpercent,
}: ProgressBarProps) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((pervPercent) =>
        pervPercent < Maxpercent ? pervPercent + 1 : Maxpercent,
      );
    }, 10);

    return () => clearInterval(interval);
  }, [Maxpercent]);

  return { percent, setPercent };
}
