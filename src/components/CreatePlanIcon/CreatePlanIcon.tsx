'use client';

import { useSessionStorage } from './../../hooks/useSessionStorage';

export default function CreatePlanIcon() {
  const [iconNumber, setIconNumber] = useSessionStorage({
    key: 'createPlan-icon',
    initialValue: 0,
  });

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
