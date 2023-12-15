import { useState } from 'react';

interface SessionStorageProps<T> {
  key: string;
  initialValue: T;
}

export const useSessionStorage = <T>({
  key,
  initialValue,
}: SessionStorageProps<T>) => {
  const [getItem, setStoredItem] = useState<T>(() => {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setItem = (value: T) => {
    setStoredItem(value);
    sessionStorage.setItem(key, JSON.stringify(value));
  };

  return [getItem, setItem] as const;
};
