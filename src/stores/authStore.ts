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

      onSet((newValue, _, isReset) => {
        if (isReset) return local.removeItem(key);

        return local.setItem(key, JSON.stringify(newValue));
      });
    }
  };

export const authStore = atom<auth | null>({
  key: 'authState',
  default: null,
  effects: [localStorageEffect<auth | null>('auth')],
});
