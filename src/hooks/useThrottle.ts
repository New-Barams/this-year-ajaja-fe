import { useCallback } from 'react';

export const useThrottle = (delaySecond: number) => {
  const throttle = useCallback(() => {
    let timer: NodeJS.Timeout | null;
    return (callback: () => void) => {
      if (timer) return;
      callback();
      timer = setTimeout(() => {
        timer = null;
      }, delaySecond * 1000);
    };
  }, [delaySecond]);
  return throttle();
};
