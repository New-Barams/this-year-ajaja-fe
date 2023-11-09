'use client';

import { Button } from '@/components';
import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import './index.scss';

interface ModalProps {
  onClickYes: () => void;
  onClickNo: () => void;
  children: React.ReactNode;
}

export default function Modal({
  onClickYes,
  onClickNo,
  children,
  ...props
}: ModalProps) {
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const handleClickOutside = (e: MouseEvent) => {
    if (
      backgroundRef.current &&
      !backgroundRef.current.contains(e.target as Node)
    ) {
      onClickNo();
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
  return (
    <div className={classNames(`modal-background`)} {...props}>
      <div
        className={classNames(
          `modal-wrapper`,
          'border-origin-primary',
          'background-origin-white-100',
        )}
        ref={backgroundRef}>
        <div className={classNames(`modal-wrapper__content`)}>
          <div className={classNames(`font-size-xl`, `modal-wrapper__text`)}>
            {children}
          </div>
          <div className={classNames(`modal-wrapper__button`)}>
            <Button
              background="primary"
              color="white-100"
              size="md"
              border={false}
              onClick={onClickYes}>
              네
            </Button>
            <Button
              background="white-100"
              color="primary"
              size="md"
              border={true}
              onClick={onClickNo}>
              아니오
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
