'use client';

import { Button } from '@/components';
import { useModalClose } from '@/hooks/useModalClose';
import classNames from 'classnames';
import Link from 'next/link';
import { useRef } from 'react';
import './index.scss';

type ModalExitProps = {
  closeModal: () => void;
  exitLink: string;
  children: React.ReactNode;
};

export default function ModalExit({
  closeModal,
  exitLink,
  children,
}: ModalExitProps) {
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  useModalClose(backgroundRef, closeModal);
  return (
    <div
      className={classNames(
        `modal-basic-wrapper`,
        'border-origin-primary',
        'background-origin-white-100',
      )}
      ref={backgroundRef}>
      <div className={classNames(`modal-basic-wrapper__content`)}>
        <div
          className={classNames(
            `font-size-xl`,
            `color-origin-gray-300`,
            `modal-basic-wrapper__text`,
          )}>
          {children}
        </div>
        <div className={classNames(`modal-basic-wrapper__button`)}>
          <Link href={`${exitLink}`}>
            <Button
              background="primary"
              color="white-100"
              size="md"
              border={false}
              onClick={closeModal}>
              네
            </Button>
          </Link>
          <Button
            background="white-100"
            color="primary"
            size="md"
            border={true}
            onClick={closeModal}>
            아니오
          </Button>
        </div>
      </div>
    </div>
  );
}
