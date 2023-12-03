import { Button, Icon } from '@/components';
import { useModalClose } from '@/hooks/useModalClose';
import classNames from 'classnames';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import ModalRadio from './ModalRadio';
import './index.scss';

type ModalProps = {
  onClickFinish: (rate: number) => void;
  onClickExit: () => void;
  children: React.ReactNode;
};

export default function ModalEvaluate({
  onClickFinish,
  onClickExit,
  children,
}: ModalProps) {
  const [rate, setRate] = useState(50); // 기본 rate = 50 => 이를 input에 반영해줘야 한다

  useEffect(() => {
    console.log(`rate변화: ${rate}로 변경`);
  }, [rate]);

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
            `font-size-3xl`,
            `color-origin-gray-300`,
            `modal-evaluate-wrapper__text`,
          )}>
          {children}
        </div>
        <ModalRadio rate={rate} setRate={setRate} />
        <Button
          background="primary"
          color="white-100"
          size="lg"
          border={false}
          classNameList={['modal-evaluate--button']}
          onClick={() => {
            onClickFinish(rate);
          }}>
          피드백 완료
        </Button>
        <div className={classNames('modal-evaluate-wrapper__warning')}>
          <Icon name="WARNING" color="primary" size="xl" />
          <span className={classNames('font-size-lg', 'color-origin-primary')}>
            피드백이 완료되면 다시 평가할 수 없습니다.
          </span>
        </div>
      </div>
    </div>
  );
}
