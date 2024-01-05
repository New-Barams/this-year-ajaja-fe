'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function RouteChangeObserver() {
  const pathName = usePathname();

  useEffect(() => {
    console.log(pathName);
  }, [pathName]);
  return <></>;
}
