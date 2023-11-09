import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

interface auth {
  accessToken: string;
  refreshToken: string;
  user: User;
}

interface User {
  name: string;
  id: string;
}

const localStorage =
  typeof window !== 'undefined' ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'auth',
  storage: localStorage,
});

export const authStore = atom<auth | null>({
  key: 'auth',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
