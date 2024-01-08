'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function RouteChangeObserver() {
  const pathName = usePathname();
  const previousPage = useRef<string | null>(null);
  //TODO: 세션 유틸로 변경, 로그인 후에도 작동되는데 괜찮은가?
  //로그인 안 한 경우 접근 경로가 계획에서 오거나, 둘러보기에서 오거나, 계획갔다 둘러보기 가면 저장된다. 계획 둘러보기 로그인이어도 계획으로 간다 .
  useEffect(() => {
    if (pathName === '/login') {
      if (previousPage.current) {
        window.sessionStorage.setItem('prev', previousPage.current);
      } else {
        window.sessionStorage.removeItem('prev');
      }
    } else if (pathName.startsWith('/plans')) {
      previousPage.current = pathName;
    } else {
      previousPage.current = null;
    }
  }, [pathName]);
  return <></>;
}
