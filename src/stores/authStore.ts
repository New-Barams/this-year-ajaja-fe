import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { AtomEffect, atom } from 'recoil';

export interface auth {
  accessToken: string;
  refreshToken: string;
}

const cookiesEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = getCookie(key);
    if (savedValue !== undefined) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue) => {
      if (newValue === null) {
        deleteCookie(key);
        return null;
      }

      return setCookie(key, JSON.stringify(newValue));
    });
  };

export const authStore = atom<auth | null>({
  key: 'authState',
  default: null,
  effects: [cookiesEffect<auth | null>('auth')],
});
