'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function RouteChangeObserver() {
  const pathName = usePathname();
  const previousPage = useRef<string | null>(null);
  useEffect(() => {
    if (pathName === '/login') {
      if (previousPage.current) {
        window.sessionStorage.setItem('prev', previousPage.current);
      }
    } else {
      previousPage.current = pathName;
    }
  }, [pathName]);
  return <></>;
}
