'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function RouteChangeObserver() {
  const pathName = usePathname();
  const previousPage = useRef<string>('');
  useEffect(() => {
    console.log(pathName);
    console.log('pre:' + previousPage.current);
    if (pathName === '/login') {
      window.sessionStorage.setItem('pre', previousPage.current);
    } else {
      previousPage.current = window.location.href;
    }
  }, [pathName]);
  return <></>;
}
