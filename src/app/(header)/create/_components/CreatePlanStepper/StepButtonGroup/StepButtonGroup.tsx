'use client';

import { Button } from '@/components';
import { ajajaToast } from '@/components/Toaster/customToast';
import { SESSION_STORAGE_KEY } from '@/constants';
import { usePostNewPlanMutation } from '@/hooks/apis/usePostNewPlanMutation';
import { PlanContentType } from '@/types/Plan';
import { RemindItemType, RemindOptionType } from '@/types/Remind';
import { PostNewPlanRequestBody } from '@/types/apis/plan/PostNewPlan';
import { changeRemindTimeToString } from '@/utils/changeRemindTimeToString';
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

  const { mutate: createNewPlanAPI } = usePostNewPlanMutation();

  const handleClickCreatePlan = (isEveryStepDataAllExist: boolean) => {
    const planIconItem = sessionStorage.getItem(SESSION_STORAGE_KEY.STEP_1);
    const planContentItem = sessionStorage.getItem(SESSION_STORAGE_KEY.STEP_2);
    const remindDateItem = sessionStorage.getItem(SESSION_STORAGE_KEY.STEP_3);
    const remindMessageItem = sessionStorage.getItem(
      SESSION_STORAGE_KEY.STEP_4,
    );

    if (
      isEveryStepDataAllExist &&
      planIconItem &&
      planContentItem &&
      remindDateItem &&
      remindMessageItem
    ) {
      const planIcon = JSON.parse(planIconItem) as number;
      const planContent = JSON.parse(planContentItem) as PlanContentType;
      const remindDate = JSON.parse(remindDateItem) as RemindOptionType;
      const remindMessage = JSON.parse(remindMessageItem) as RemindItemType[];

      const data: PostNewPlanRequestBody = {
        iconNumber: planIcon,
        isPublic: planContent.isPublic,
        title: planContent.title,
        description: planContent.description,
        tags: planContent.tags,

        remindTotalPeriod: remindDate.TotalPeriod,
        remindTerm: remindDate.Term,
        remindDate: remindDate.Date,
        remindTime: changeRemindTimeToString(remindDate.Time),
        messages: remindMessage.map((messageItem) => {
          return messageItem.message;
        }),
      };

      createNewPlanAPI(data);
      ajajaToast.success('계획 작성 API 실행');
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
