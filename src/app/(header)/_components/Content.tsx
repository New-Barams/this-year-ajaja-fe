'use client';

import { ToTopFloatingButton } from '@/components';
import { useScroll } from '@/hooks/useScroll';
import classNames from 'classnames';
import { ReactNode } from 'react';

type ContentType = {
  children: ReactNode;
};

export default function Content({ children }: ContentType) {
  const { scrollableRef, handleScroll } = useScroll();

  return (
    <div
      ref={scrollableRef}
      className={classNames(
        'header-layout__content',
        'border-origin-orange-300',
      )}
      onScroll={handleScroll}>
      {children}
      <ToTopFloatingButton />
    </div>
  );
}
