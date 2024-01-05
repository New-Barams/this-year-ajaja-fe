import { atom } from 'recoil';

export const previousPageStore = atom<null | string>({
  key: 'prev',
  default: null,
});
