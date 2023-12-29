import { atom } from 'recoil';

export const isMyPlanStore = atom<boolean>({
  key: 'isMyPlan',
  default: false,
});
