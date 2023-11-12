import { AtomEffect, atom } from 'recoil';

export interface auth {
  accessToken: string;
  refreshToken: string;
}

const local = typeof window !== 'undefined' ? window.localStorage : undefined;

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    if (local) {
      const savedValue = local.getItem(key);
      if (savedValue !== null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue) => {
        if (newValue === null) {
          local.removeItem(key);
          return null;
        }

        return local.setItem(key, JSON.stringify(newValue));
      });
    }
  };

export const authStore = atom<auth | null>({
  key: 'authState',
  default: null,
  effects: [localStorageEffect<auth | null>('auth')],
});
