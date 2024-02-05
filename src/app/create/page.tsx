'use client';

import {
  CreatePlanContent,
  CreatePlanIcon,
  CreatePlanRemindDate,
  CreatePlanRemindMessage,
  ModalContinueCreate,
  ModalFixRemindDate,
} from '@/components';
import { STEP_NAME } from '@/constants';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import StepButtonGroup from './_components/StepButtonGroup/StepButtonGroup';
import useCreatePage from './hooks/useCreatePage';
import './index.scss';

const StepperComponent = dynamic(
  () => import('./_components/CreatePlanStepper/CreatePlanStepper'),
  {
    ssr: false,
  },
);

export default function CreatePage() {
  const {
    nowStep,
    goToPreviousStep,
    goToNextStep,
    isFirstStepDataAllExist,
    setIsFirstStepDataAllExist,
    isSecondStepDataAllExist,
    setIsSecondStepDataAllExist,
    isLastStepDataAllExist,
    setIsLastStepDataAllExist,
    fixedMonthList,
    fixedDate,
    isContinueCreatePlanModalOpen,
    setIsFixRemindDateModalOpen,
    onClickContinueCreateModalYes,
    onClickContinueCreateModalNo,
    isFixRemindDateModalOpen,
    goToLastStep,
    onClickRemindDateModalYes,
  } = useCreatePage();

  return (
    <div className={classNames('create-page')}>
      <StepperComponent nowStep={nowStep - 1} />

      <div className={classNames('create-page__title', 'font-size-xl')}>
        {STEP_NAME[nowStep]}
      </div>

      {isContinueCreatePlanModalOpen ? (
        <ModalContinueCreate
          onClickContinueCreateModalYes={onClickContinueCreateModalYes}
          onClickContinueCreateModalNo={onClickContinueCreateModalNo}
        />
      ) : (
        (() => {
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
              return <CreatePlanRemindDate isCreateOrEditPage="create" />;
            case 4:
              return (
                <CreatePlanRemindMessage
                  setIsLastStepDataAllExist={(isExist: boolean) => {
                    setIsLastStepDataAllExist(isExist);
                  }}
                  isCreateOrEditPage="create"
                />
              );
            default:
              return (
                <CreatePlanIcon
                  setIsFirstStepDataAllExist={(isExist: boolean) => {
                    setIsFirstStepDataAllExist(isExist);
                  }}
                />
              );
          }
        })()
      )}

      <StepButtonGroup
        nowStep={nowStep}
        goToPreviousStep={goToPreviousStep}
        goToNextStep={goToNextStep}
        goToLastStep={goToLastStep}
        isFirstStepDataAllExist={isFirstStepDataAllExist}
        isSecondStepDataAllExist={isSecondStepDataAllExist}
        isLastStepDataAllExist={isLastStepDataAllExist}
      />

      {isFixRemindDateModalOpen && (
        <ModalFixRemindDate
          fixedMonthList={fixedMonthList}
          fixedDate={fixedDate}
          onClickYes={() => {
            onClickRemindDateModalYes();
          }}
          onClickNo={() => {
            setIsFixRemindDateModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
