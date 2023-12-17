import { useState } from 'react';

interface SessionStorageProps<T> {
  key: string;
  initialValue: T;
  setSessionValueAtFirst?: boolean;
}

export const useSessionStorage = <T>({
  key,
  initialValue,
  setSessionValueAtFirst = false,
}: SessionStorageProps<T>) => {
  const [getItem, setStoredItem] = useState<T>(() => {
    const item = sessionStorage.getItem(key);
    if (item) {
      // sessionStorage에 값이 있다면 그 값을 사용
      return JSON.parse(item);
    } else {
      // session에 값이 없을 때 초기값으로 사용
      if (setSessionValueAtFirst) {
        // 초기값을 sessionStorage에 저장
        sessionStorage.setItem(key, JSON.stringify(initialValue));
      }
      return initialValue;
    }
  });

  const setItem = (value: T) => {
    setStoredItem(value);
    sessionStorage.setItem(key, JSON.stringify(value));
  };

  return [getItem, setItem] as const;
};
