'use client';

import { ToTopFloatingButton } from '@/components';
import classNames from 'classnames';
import { ReactNode } from 'react';

type ContentType = {
  children: ReactNode;
};

export default function Content({ children }: ContentType) {
  return (
    <div
      className={classNames(
        'header-layout__content',
        'border-origin-orange-300',
      )}>
      {children}
      <ToTopFloatingButton />
    </div>
  );
}
