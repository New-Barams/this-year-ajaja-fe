import { SESSION_STORAGE_KEY } from '@/constants';
import { RemindData } from '@/types/Remind';
import { changeRemindTimeToNumber } from '@/utils/changeRemindTimeToNumber';
import { useState } from 'react';

export const useEditRemindPage = (remindData: RemindData) => {
  const [originTerm, setOriginTerm] = useState(remindData.remindTerm);
  const [originPeriod, setOriginPeriod] = useState(remindData.totalPeriod);
  const [isMounted, setIsMounted] = useState(false);

  if (!isMounted) {
    sessionStorage.removeItem(SESSION_STORAGE_KEY.EDIT_REMIND_OPTION);
    sessionStorage.setItem(
      SESSION_STORAGE_KEY.EDIT_REMIND_OPTION,
      JSON.stringify({
        TotalPeriod: remindData.totalPeriod,
        Term: remindData.remindTerm,
        Date: remindData.remindDate,
        Time: changeRemindTimeToNumber(remindData.remindTime),
      }),
    );

    sessionStorage.removeItem(SESSION_STORAGE_KEY.EDIT_REMIND_MESSAGE);
    sessionStorage.setItem(
      SESSION_STORAGE_KEY.EDIT_REMIND_MESSAGE,
      JSON.stringify(
        remindData.messageResponses.map((message) => {
          return {
            date: {
              month: message.remindMonth,
              day: message.remindDay,
            },
            message: message.remindMessage,
          };
        }),
      ),
    );

    setIsMounted(true);
  }

  return { originTerm, setOriginTerm, originPeriod, setOriginPeriod };
};
