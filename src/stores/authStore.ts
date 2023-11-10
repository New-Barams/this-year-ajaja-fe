import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export interface auth {
  accessToken: string;
  refreshToken: string;
}

const localStorage =
  typeof window !== 'undefined' ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'authState',
  storage: localStorage,
});

export const authStore = atom<auth | null>({
  key: 'auth',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
