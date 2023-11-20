import { useCallback } from 'react';

export const useThrottle = () => {
  const throttle = useCallback(() => {
    let timer: NodeJS.Timeout | null;
    return (callback: () => void, delaySecond = 1) => {
      if (timer) return;
      callback();
      timer = setTimeout(() => {
        timer = null;
      }, delaySecond * 1000);
    };
  }, []);
  return throttle();
};
