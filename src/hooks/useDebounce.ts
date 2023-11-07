'use client';

import { DependencyList, useCallback, useEffect } from 'react';

export const useDebounce = (
  func: () => void,
  delay: number,
  deps: DependencyList,
) => {
  const callback = useCallback(func, [...deps, func]);
  useEffect(() => {
    const timer = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [callback, delay]);
};
