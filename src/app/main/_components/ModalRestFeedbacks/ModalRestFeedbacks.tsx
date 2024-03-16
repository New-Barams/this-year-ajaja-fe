'use client';

import { Button } from '@/components';
import { useModalClose } from '@/hooks';
import { useRef } from 'react';
import './index.scss';

interface ModalRestFeedbacksProps {
  handleClose: () => void;
  restFeedbacks: RestFeedback[];
}

export type RestFeedback = {
  dDay: number;
  planId: number;
  planTittle: string;
};
export default function ModalRestFeedbacks({
  handleClose,
  restFeedbacks,
}: ModalRestFeedbacksProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useModalClose(wrapperRef, handleClose);
  return (
    <div ref={wrapperRef} className="modal-rest-feedback__wrapper">
      <h1 className="modal-rest-feedback__title font-size-lg">남은 피드백들</h1>
      <div className="modal-rest-feedback__content">
        {restFeedbacks.map((feedback) => (
          <div
            key={feedback.planId}
            className="modal-rest-feedback__content--item">
            <h1 className="font-size-md ">
              <span className="modal-rest-feedback__content--item--title color-origin-primary">
                {feedback.planTittle}
              </span>{' '}
              피드백
            </h1>
            {/* TODO 클릭시 해당 피드백? 계획으로? */}
            <Button
              classNameList={['modal-rest-feedback__content--item--button']}
              background="primary"
              color="white-100"
              border={false}
              size="sm">{`${feedback.dDay} 피드백 하기(D-${3})`}</Button>
          </div>
        ))}
      </div>
      <Button
        classNameList={['modal-rest-feedback--close-button']}
        background="primary"
        color="white-100"
        size="sm"
        border={false}
        onClick={handleClose}>
        닫기
      </Button>
    </div>
  );
}
