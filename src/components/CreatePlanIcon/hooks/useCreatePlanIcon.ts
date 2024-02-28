import { SESSION_STORAGE_KEY } from '@/constants';
import { useSessionStorage } from '@/hooks';
import { useEffect, useState } from 'react';

interface useCreatePlanIconProps {
  setIsFirstStepDataAllExist: (isExist: boolean) => void;
}

export default function useCreatePlanIcon({
  setIsFirstStepDataAllExist,
}: useCreatePlanIconProps) {
  const [iconNumber, setIconNumber] = useSessionStorage<number | null>({
    key: SESSION_STORAGE_KEY.STEP_1,
    initialValue: null,
  });

  useEffect(() => {
    if (iconNumber) {
      setIsFirstStepDataAllExist(true);
    } else {
      setIsFirstStepDataAllExist(false);
    }
  }, [iconNumber, setIsFirstStepDataAllExist]);

  const [isSelectIconModalOpen, setIsSelectIconModalOpen] = useState(false);

  return {
    iconNumber,
    setIconNumber,
    isSelectIconModalOpen,
    setIsSelectIconModalOpen,
  };
}
