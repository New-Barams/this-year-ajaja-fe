'use client';

import { useThrottle } from '@/hooks/useThrottle';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '..';
import './index.scss';

export default function FloatingButton() {
  const floatingButton = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const throttle = useThrottle();

  useEffect(() => {
    const scrolledContainer = floatingButton.current
      ?.parentElement as HTMLDivElement;

    const checkScroll = () => {
      throttle(() => {
        scrolledContainer.scrollTop >= 300 ? setIsOpen(true) : setIsOpen(false);
      }, 0.2);
    };
    if (scrolledContainer) {
      scrolledContainer.addEventListener('scroll', checkScroll);
    }
    return () => {
      scrolledContainer.removeEventListener('scroll', checkScroll);
    };
  }, [throttle, floatingButton]);

  const handleGoToTop = () => {
    if (floatingButton.current?.parentElement) {
      const scrolledContainer = floatingButton.current
        ?.parentElement as HTMLDivElement;
      scrolledContainer.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };
  return (
    <button
      ref={floatingButton}
      className={classNames('to-top-button', isOpen && 'visible')}
      onClick={handleGoToTop}>
      <Icon name="ARROW_UP" color="white-100" />
    </button>
  );
}
