import { SESSION_STORAGE_KEY } from '@/constants';
import { PlanContentType } from '@/types/Plan';
import { RemindItemType, RemindOptionType } from '@/types/Remind';

type SessionStorageKey = keyof typeof SESSION_STORAGE_KEY;

export const getSessionStorageData = (key: SessionStorageKey) => {
  switch (key) {
    case 'STEP_1': {
      const item = sessionStorage.getItem(SESSION_STORAGE_KEY.STEP_1);
      return item ? (JSON.parse(item) as number) : null;
    }

    case 'STEP_2': {
      const item = sessionStorage.getItem(SESSION_STORAGE_KEY.STEP_1);
      return item ? (JSON.parse(item) as PlanContentType) : null;
    }

    case 'STEP_3': {
      const item = sessionStorage.getItem(SESSION_STORAGE_KEY.STEP_3);
      return item ? (JSON.parse(item) as RemindOptionType) : null;
    }

    case 'STEP_4': {
      const item = sessionStorage.getItem(SESSION_STORAGE_KEY.STEP_4);
      return item ? (JSON.parse(item) as RemindItemType[]) : null;
    }

    case 'EDIT_REMIND_OPTION': {
      const item = sessionStorage.getItem(
        SESSION_STORAGE_KEY.EDIT_REMIND_OPTION,
      );
      return item ? (JSON.parse(item) as RemindOptionType) : null;
    }

    case 'EDIT_REMIND_MESSAGE': {
      const item = sessionStorage.getItem(
        SESSION_STORAGE_KEY.EDIT_REMIND_MESSAGE,
      );
      return item ? (JSON.parse(item) as RemindItemType[]) : null;
    }

    default:
      return null;
  }
};
