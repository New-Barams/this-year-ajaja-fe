'use client';

import { Button } from '@/components';
import { ajajaToast } from '@/components/Toaster/customToast';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import React from 'react';
import './index.scss';

interface StepButtonGroupProps {
  nowStep: number;
  goToPreviousStep: () => void;
  goToNextStep: () => void;
  goToLastStep: () => void;
  isFirstStepDataAllExist: boolean;
  isSecondStepDataAllExist: boolean;
  isLastStepDataAllExist: boolean;
}

export default function StepButtonGroup({
  nowStep,
  goToPreviousStep,
  goToNextStep,
  goToLastStep,
  isFirstStepDataAllExist,
  isSecondStepDataAllExist,
  isLastStepDataAllExist,
}: StepButtonGroupProps) {
  const router = useRouter();

  const isEveryStepDataAllExist =
    isFirstStepDataAllExist &&
    isSecondStepDataAllExist &&
    isLastStepDataAllExist;

  const exitCreatePlanPage = () => {
    router.back();
  };

  const handleClickGoToNextStep = (isEachStepDataAllExist: boolean) => {
    if (isEachStepDataAllExist) {
      goToNextStep();
    } else {
      ajajaToast.error('모든 항목을 입력해주세요!');
    }
  };

  const handleClickCreatePlan = (isEveryStepDataAllExist: boolean) => {
    if (isEveryStepDataAllExist) {
      ajajaToast.success('계획 작성 API 실행 후 홈으로 이동');
      router.push('/home');
    } else {
      ajajaToast.error('모든 항목을 입력해주세요!');
    }
  };

  return (
    <div className={classNames('step-button-group')}>
      {(() => {
        switch (nowStep) {
          case 1:
            return (
              <>
                <Button
                  background="white-100"
                  border={true}
                  color="primary"
                  onClick={exitCreatePlanPage}
                  size="sm">
                  나가기
                </Button>
                <Button
                  background="primary"
                  border={false}
                  color="white-100"
                  onClick={() => {
                    handleClickGoToNextStep(isFirstStepDataAllExist);
                  }}>
                  다음 단계
                </Button>
              </>
            );
          case 2:
            return (
              <>
                <Button
                  background="white-100"
                  border={true}
                  color="primary"
                  onClick={goToPreviousStep}>
                  이전 단계
                </Button>
                <Button
                  background="primary"
                  border={false}
                  color="white-100"
                  onClick={() => {
                    handleClickGoToNextStep(isSecondStepDataAllExist);
                  }}>
                  다음 단계
                </Button>
              </>
            );
          case 3:
            return (
              <>
                <Button
                  background="white-100"
                  border={true}
                  color="primary"
                  onClick={goToPreviousStep}>
                  이전 단계
                </Button>
                <Button
                  background="primary"
                  border={false}
                  color="white-100"
                  onClick={() => {
                    goToLastStep();
                  }}>
                  다음 단계
                </Button>
              </>
            );
          case 4:
            return (
              <>
                <Button
                  background="white-100"
                  border={true}
                  color="primary"
                  onClick={goToPreviousStep}>
                  이전 단계
                </Button>
                <Button
                  background="primary"
                  border={false}
                  color="white-100"
                  onClick={() => {
                    handleClickCreatePlan(isEveryStepDataAllExist);
                  }}>
                  작성 완료
                </Button>
              </>
            );
          default:
            return <div>Invalid nowStep value</div>;
        }
      })()}
    </div>
  );
}
