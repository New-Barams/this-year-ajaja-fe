import { Button } from '@/components';
import { useModalClose } from '@/hooks/useModalClose';
import classNames from 'classnames';
import { useRef } from 'react';
import './index.scss';

type ModalProps = {
  onClickYes: () => void;
  onClickNo: () => void;
  children: React.ReactNode;
};

export default function ModalBasic({
  onClickYes,
  onClickNo,
  children,
}: ModalProps) {
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  useModalClose(backgroundRef, onClickNo);
  return (
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
  );
}
