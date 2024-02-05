import { SESSION_STORAGE_KEY } from '@/constants';
import { useSessionStorage } from '@/hooks';
import { RemindItemType } from '@/types';
import { useCallback, useEffect, useState } from 'react';

interface useCreatePlanRemindMessageProps {
  setIsLastStepDataAllExist: (isExist: boolean) => void;
  isCreateOrEditPage: 'create' | 'edit';
}

export default function useCreatePlanRemindMessage({
  setIsLastStepDataAllExist,
  isCreateOrEditPage,
}: useCreatePlanRemindMessageProps) {
  const [remindMessageList, setRemindMessageList] = useSessionStorage<
    RemindItemType[]
  >({
    key:
      isCreateOrEditPage === 'create'
        ? SESSION_STORAGE_KEY.STEP_4
        : SESSION_STORAGE_KEY.EDIT_REMIND_MESSAGE,
    initialValue: [],
  });

  useEffect(() => {
    if (remindMessageList) {
      if (
        remindMessageList.every((remindItem) => remindItem.message.length > 0)
      ) {
        setIsLastStepDataAllExist(true);
      } else {
        setIsLastStepDataAllExist(false);
      }
    }
  }, [remindMessageList, setIsLastStepDataAllExist]);

  const handleChangeRemindMessage = (
    month: number,
    day: number,
    newMessage: string,
  ) => {
    setRemindMessageList(
      remindMessageList.map((item) => {
        if (item.date.month === month && item.date.day === day) {
          return { ...item, message: newMessage };
        }
        return item;
      }),
    );
  };

  const makeAllRemindMessageSame = useCallback(() => {
    if (remindMessageList.length > 1) {
      const firstMessage = remindMessageList[0].message;
      setRemindMessageList(
        remindMessageList.map((item) => ({ ...item, message: firstMessage })),
      );
    }
  }, [remindMessageList, setRemindMessageList]);

  const [isSendRemindModalOpen, setIsSendRemindModalOpen] = useState(false);

  return {
    handleChangeRemindMessage,
    makeAllRemindMessageSame,
    remindMessageList,
    isSendRemindModalOpen,
    setIsSendRemindModalOpen,
  };
}
