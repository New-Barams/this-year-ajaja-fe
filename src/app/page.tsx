'use client';

import { SwitchButton } from '@/components';
import ReadOnlyPlan from '@/components/ReadOnlyPlan/ReadOnlyPlan';
import { PlanData } from '@/components/ReadOnlyPlan/ReadOnlyPlan';
// import { useDebounce } from '@/hooks/useDebounce';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function Home() {
  const data: PlanData = {
    id: 1234,
    userId: 123121,
    nickname: '테스트임니다.',
    title: '테스트 타이틀',
    description: '테스트 설명',
    isPublic: true,
    ajajas: 25,
    isAjajaOn: true,
    tags: ['stst', 'ststt', 'ststt', 'werwrw'],
    createdAt: '',
    isCanAjaja: true,
  };
  const [isOn, setIsOn] = useState<boolean>(false);
  useEffect(() => {
    syncIsOn.current = isOn;
  }, [isOn]);
  const syncIsOn = useRef(isOn);
  const originalState = useRef(isOn);

  const cons = useCallback(() => {
    console.log('api 송신');
  }, []);

  const debounce = useCallback(() => {
    let timer: NodeJS.Timeout;
    return () => {
      if (timer) clearTimeout(timer);
      console.log(syncIsOn.current, originalState.current);
      timer = setTimeout(() => {
        originalState.current = !originalState.current;
        if (syncIsOn.current !== originalState.current) cons();
      }, 3000);
    };
  }, [cons]);

  const debouncedCon = debounce();
  return (
    <>
      <button
        onClick={() => {
          setIsOn(!isOn);
          debouncedCon();
        }}>
        testest
      </button>
      <SwitchButton isOn={isOn} onClick={() => {}}></SwitchButton>
      <ReadOnlyPlan isMine={false} planData={data} />
    </>
  );
}
