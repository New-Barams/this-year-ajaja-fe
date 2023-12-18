'use client';

import { Button } from '@/components';
import { ajajaToast } from '@/components/Toaster/customToast';
import { useRouter } from 'next/navigation';
import React from 'react';

interface StepButtonGroupProps {
  nowStep: number;
  goToPreviousStep: () => void;
  goToNextStep: () => void;
  isFirstStepDataAllExist: boolean;
  isSecondStepDataAllExist: boolean;
  isEveryStepDataAllExist: boolean;
}

export default function StepButtonGroup({
  nowStep,
  goToPreviousStep,
  goToNextStep,
  isFirstStepDataAllExist,
  isSecondStepDataAllExist,
  isEveryStepDataAllExist,
}: StepButtonGroupProps) {
  const router = useRouter();

  // 나가기 버튼 클릭 시
  const exitCreatePlanPage = () => {
    router.back();
  };

  const handleClickGoToNextStep = (isEachStepDataAllExist: boolean) => {
    if (isEachStepDataAllExist) {
      goToNextStep();
    } else {
      ajajaToast.error(
        '모든 항목을 입력해야만 다음 단계로 넘어갈 수 있습니다 !',
      );
    }
  };

  const handleClickCreatePlan = (isEveryStepDataAllExist: boolean) => {
    // 1,2,3,4 단계 data 모두 검사
    if (isEveryStepDataAllExist) {
      ajajaToast.success('계획 작성 API 실행 후 홈으로 이동');
      router.push('/home');
    } else {
      ajajaToast.error('모든 항목을 입력해야만 계획을 작성할 수 있습니다 !');
    }
  };

  return (
    <div>
      {(() => {
        switch (nowStep) {
          case 1:
            return (
              <>
                <Button
                  background="white-100"
                  border={true}
                  color="primary"
                  onClick={exitCreatePlanPage}>
                  나가기
                </Button>
                <Button
                  background="primary"
                  border={true}
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
                  border={true}
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
                  border={true}
                  color="white-100"
                  onClick={() => {
                    // TODO: 모달 띄워주기
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
                  border={true}
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

// 클래스 이름 추가
// data 검사 로직 추가
