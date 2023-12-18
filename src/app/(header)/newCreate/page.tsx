'use client';

import {
  CreatePlanContent,
  CreatePlanIcon,
  CreatePlanRemindMessage,
} from '@/components';
import CreatePlanRemindDate from '@/components/CreatePlanRemindDate/CreatePlanRemindDate';
import classNames from 'classnames';
import { useState } from 'react';
import StepButtonGroup from './_components/StepButtonGroup/StepButtonGroup';

export default function NewCreatePage() {
  const [nowStep, setNowStep] = useState(1);

  const goToNextStep = () => {
    if (nowStep < 4) {
      setNowStep(nowStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (nowStep > 1) {
      setNowStep(nowStep - 1);
    }
  };

  const [isFirstStepDataAllExist, setIsFirstStepDataAllExist] = useState(false);
  const [isSecondStepDataAllExist, setIsSecondStepDataAllExist] =
    useState(false);
  const [isEveryStepDataAllExist, setIsEveryStepDataAllExist] = useState(false);

  return (
    <div className={classNames('new-create-page')}>
      <div className="stepper" style={{ height: '2rem' }}>
        스테퍼 - 현재 단계 : {nowStep}
      </div>

      {(() => {
        switch (nowStep) {
          case 1:
            return (
              <CreatePlanIcon
                setIsFirstStepDataAllExist={(isExist: boolean) => {
                  setIsFirstStepDataAllExist(isExist);
                }}
              />
            );
          case 2:
            return (
              <CreatePlanContent
                setIsSecondStepDataAllExist={(isExist: boolean) => {
                  setIsSecondStepDataAllExist(isExist);
                }}
              />
            );
          case 3:
            return <CreatePlanRemindDate />;
          case 4:
            return (
              <CreatePlanRemindMessage
                setIsEveryStepDataAllExist={(isExist: boolean) => {
                  setIsEveryStepDataAllExist(isExist);
                }}
              />
            );
          default:
            return (
              <CreatePlanContent
                setIsSecondStepDataAllExist={(isExist: boolean) => {
                  setIsSecondStepDataAllExist(isExist);
                }}
              />
            );
        }
      })()}

      <StepButtonGroup
        nowStep={nowStep}
        goToPreviousStep={goToPreviousStep}
        goToNextStep={goToNextStep}
        isFirstStepDataAllExist={isFirstStepDataAllExist}
        isSecondStepDataAllExist={isSecondStepDataAllExist}
        isEveryStepDataAllExist={isEveryStepDataAllExist}
      />
    </div>
  );
}
