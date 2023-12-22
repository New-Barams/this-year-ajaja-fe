import { atom } from 'recoil';

export const canMakeNewPlanStore = atom({
  key: 'canMakeNewPlanState',
  default: true,
});
