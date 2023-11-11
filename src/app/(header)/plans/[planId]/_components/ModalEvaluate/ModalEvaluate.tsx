import { Button, Icon } from '@/components';
import { useModalClose } from '@/hooks/useModalClose';
import classNames from 'classnames';
import { useRef } from 'react';
import ModalRadio from './ModalRadio';
import './index.scss';

type ModalProps = {
  onClickFinish: () => void;
  onClickExit: () => void;
  children: React.ReactNode;
};

export default function ModalEvaluate({
  onClickFinish,
  onClickExit,
  children,
}: ModalProps) {
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  useModalClose(backgroundRef, onClickExit);
  return (
    <div
      className={classNames(
        `modal-evaluate-wrapper`,
        'border-origin-primary',
        'background-origin-white-100',
      )}
      ref={backgroundRef}>
      <div
        className={classNames('modal-evaluate-wrapper__exit')}
        onClick={onClickExit}>
        <Icon name="CLOSE" color="gray-300" size="3xl" />
      </div>

      <div className={classNames(`modal-evaluate-wrapper__content`)}>
        <div
          className={classNames(
            `font-size-2xl`,
            `color-origin-gray-300`,
            `modal-evaluate-wrapper__text`,
          )}>
          {children}
        </div>
        <ModalRadio />
        <Button
          background="primary"
          color="white-100"
          size="lg"
          border={false}
          onClick={onClickFinish}>
          피드백 완료
        </Button>
        <div className={classNames('modal-evaluate-wrapper__worning')}>
          <Icon name="WARNING" color="primary" size="3xl" />
          <span className={classNames('font-size-2xl', 'color-origin-primary')}>
            피드백이 완료되면 다시 평가할 수 없습니다.
          </span>
        </div>
      </div>
    </div>
  );
}
