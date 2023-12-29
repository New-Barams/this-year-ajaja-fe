'use client';

import { Icon } from '@/components';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import './index.scss';

interface HelpButtonProps {
  textPosition?: Position;
  helpText: string;
}

type Position =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right';

export default function HelpButton({
  textPosition = 'top',
  helpText,
}: HelpButtonProps) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const helpButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const targetElement = event.target as HTMLElement;

      if (targetElement && targetElement.parentElement === helpButton.current) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);
  return (
    <button
      ref={helpButton}
      className={classNames(
        'help-button__button',
        isActive && 'active',
        textPosition,
        'font-size-xs',
      )}
      data-help-text={helpText}>
      <Icon name="HELP" size="xs" color="primary" />
    </button>
  );
}
