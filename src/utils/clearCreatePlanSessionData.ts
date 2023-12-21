import { SESSION_STORAGE_KEY } from '@/constants';

export const clearCreatePlanSessionData = () => {
  sessionStorage.removeItem(SESSION_STORAGE_KEY.STEP_1);
  sessionStorage.removeItem(SESSION_STORAGE_KEY.STEP_2);
  sessionStorage.removeItem(SESSION_STORAGE_KEY.STEP_3);
  sessionStorage.removeItem(SESSION_STORAGE_KEY.STEP_4);
};
