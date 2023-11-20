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
    const innerWrapper = floatingButton.current
      ?.previousSibling as HTMLDivElement;

    const checkScroll = () => {
      throttle(() => {
        innerWrapper.scrollTop >= 300 ? setIsOpen(true) : setIsOpen(false);
      }, 0.2);
    };
    if (innerWrapper) {
      innerWrapper.addEventListener('scroll', checkScroll);
    }
    return () => {
      innerWrapper.removeEventListener('scroll', checkScroll);
    };
  }, [throttle, floatingButton]);

  const handleGoToTop = () => {
    if (floatingButton.current?.previousSibling) {
      const page = floatingButton.current?.previousSibling as HTMLDivElement;
      page.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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
