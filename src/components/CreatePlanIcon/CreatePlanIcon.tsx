'use client';

import { SESSION_STORAGE_KEY } from '@/constants';
import { useEffect } from 'react';
import { useSessionStorage } from './../../hooks/useSessionStorage';

interface CreatePlanIconProps {
  setIsFirstStepDataAllExist: (isExist: boolean) => void;
}

export default function CreatePlanIcon({
  setIsFirstStepDataAllExist,
}: CreatePlanIconProps) {
  const [iconNumber, setIconNumber] = useSessionStorage<number | null>({
    key: SESSION_STORAGE_KEY.STEP_1,
    initialValue: null,
  });

  useEffect(() => {
    if (iconNumber) {
      setIsFirstStepDataAllExist(true);
    }
  }, [iconNumber, setIsFirstStepDataAllExist]);

  return (
    <div>
      <button
        onClick={() => {
          setIconNumber(3);
        }}>
        3으로 Icon number 설정
      </button>

      <div>현재 icon number : {iconNumber}</div>
    </div>
  );
}
