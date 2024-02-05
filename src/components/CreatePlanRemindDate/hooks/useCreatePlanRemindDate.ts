import { SESSION_STORAGE_KEY, TERM_OPTIONS } from '@/constants';
import { useSessionStorage } from '@/hooks';
import { RemindOptionType } from '@/types';
import { useCallback, useEffect, useMemo } from 'react';

interface useCreatePlanRemindDateProps {
  isCreateOrEditPage: 'create' | 'edit';
}

export default function useCreatePlanRemindDate({
  isCreateOrEditPage,
}: useCreatePlanRemindDateProps) {
  const [remindOptions, setRemindOptions] = useSessionStorage<RemindOptionType>(
    {
      key:
        isCreateOrEditPage === 'create'
          ? SESSION_STORAGE_KEY.STEP_3
          : SESSION_STORAGE_KEY.EDIT_REMIND_OPTION,
      initialValue: {
        TotalPeriod: 12,
        Term: 1,
        Date: 1,
        Time: 9,
      },
      setSessionValueAtFirst: true,
    },
  );

  const handleChangeRemindOption = useCallback(
    (optionKey: string, newOptionValue: number) => {
      setRemindOptions({
        ...remindOptions,
        [optionKey]: newOptionValue,
      });
    },
    [remindOptions, setRemindOptions],
  );

  const filteredTermOptions = useMemo(() => {
    return TERM_OPTIONS.filter(
      (option) => option.value <= remindOptions.TotalPeriod,
    );
  }, [remindOptions.TotalPeriod]);

  useEffect(() => {
    if (remindOptions.Term > remindOptions.TotalPeriod) {
      handleChangeRemindOption('Term', 1);
    }
  }, [remindOptions.TotalPeriod, remindOptions.Term, handleChangeRemindOption]);

  return {
    remindOptions,
    filteredTermOptions,
    handleChangeRemindOption,
  };
}
