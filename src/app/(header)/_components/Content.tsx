'use client';

import { ToTopFloatingButton } from '@/components';
import classNames from 'classnames';
import { ReactNode, useRef } from 'react';

type ContentType = {
  children: ReactNode;
};

interface CustomDiv extends HTMLDivElement {
  timeoutId?: NodeJS.Timeout;
}

export default function Content({ children }: ContentType) {
  const scrollableRef = useRef<CustomDiv>(null);

  const handleScroll = () => {
    if (scrollableRef.current) {
      scrollableRef.current.classList.add('show-scrollbar');
      if (scrollableRef.current.timeoutId) {
        clearTimeout(scrollableRef.current.timeoutId);
      }
      scrollableRef.current.timeoutId = setTimeout(function () {
        if (scrollableRef.current) {
          scrollableRef.current.classList.remove('show-scrollbar');
        }
      }, 500);
    }
  };
  console.log('Content');
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
