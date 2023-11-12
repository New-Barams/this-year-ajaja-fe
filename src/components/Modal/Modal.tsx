'use client';

import classNames from 'classnames';
import './index.scss';

type ModalProps = {
  children: React.ReactNode;
};

export default function Modal({ children, ...props }: ModalProps) {
  return (
    <div className={classNames(`modal-background`)} {...props}>
      {children}
    </div>
  );
}
