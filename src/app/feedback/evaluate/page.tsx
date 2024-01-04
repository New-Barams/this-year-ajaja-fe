'use client';

import { Button, Modal, ModalBasic, PlanInput } from '@/components';
import WrongApproach from '@/components/WrongApproach/WrongApproach';
import { useScroll } from '@/hooks/useScroll';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import EvaluateRadio from './_components/EvaluateRadio';
import './_components/index.scss';

export default function FeedbackPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const month = searchParams.get('month');
  const day = searchParams.get('day');
  const planId = parseInt(pathname.slice(19), 10);
  const { handleScroll, scrollableRef } = useScroll();

  const [evaluateOption, setEvaluateOption] = useState(100);
  const [evaluateMessage, setEvaluateMessage] = useState('');
  const [isFeedbackSendModalOpen, setIsFeedbackSendModalOpen] = useState(false);

  const handleChangeMessage = (changedMessage: string) => {
    setEvaluateMessage(changedMessage);
  };

  const handleModalClickNo = () => {
    setIsFeedbackSendModalOpen(false);
  };
  const handleModalClickYes = () => {
    setIsFeedbackSendModalOpen(true);
  };
  const handleModalOpen = () => {
    setIsFeedbackSendModalOpen(true);
  };

  return (
    <div
      className={classNames('feedback')}
      ref={scrollableRef}
      onScroll={handleScroll}>
      <div className="feedback__breadcrumb font-size-base color-origin-text-100">
        <Link href="/home">홈</Link>
        &gt;
        <Link href={`/plans/${planId}`}>내 계획</Link>
        &gt;
        <Link href={`/feedback/${planId}`}>피드백</Link>
        &gt;
        <span>피드백 하기</span>
      </div>
      {title && month && day ? (
        <>
          <div className={classNames('font-size-xl', 'feedback__title')}>
            <span className={classNames('color-origin-primary')}>{title}</span>
            <span>에 대한</span>
            <p>피드백을 완료해주세요!</p>
          </div>
          <div>
            <p className={classNames('font-size-md')}>
              {month}월 {day}일까지 계획을 얼마나 잘 이행했나요?
            </p>
            <EvaluateRadio
              evaluateOption={evaluateOption}
              setEvaluateOption={setEvaluateOption}
            />
            <PlanInput
              editable={true}
              kind="content"
              placeholder="계획에 대한 한줄평을 남겨주세요!"
              onChangeInput={handleChangeMessage}
              maxLength={150}
              textInput={evaluateMessage}
            />
          </div>
          <Button
            background="primary"
            color="white-100"
            border={false}
            onClick={handleModalOpen}
            classNameList={['feedback__send']}>
            피드백 완료
          </Button>
          {isFeedbackSendModalOpen && (
            <Modal>
              <ModalBasic
                onClickYes={handleModalClickYes}
                onClickNo={handleModalClickNo}
                confirmSentense="피드백 완료 하기">
                피드백을 완료하게 되면 수정할 수 없습니다.<br></br> 정말 해당
                피드백을 완료하시겠습니까?
              </ModalBasic>
            </Modal>
          )}
        </>
      ) : (
        <WrongApproach />
      )}
    </div>
  );
}
