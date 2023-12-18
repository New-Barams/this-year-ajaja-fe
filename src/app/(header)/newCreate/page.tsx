'use client';

import {
  CreatePlanContent,
  CreatePlanIcon,
  CreatePlanRemindMessage,
} from '@/components';
import CreatePlanRemindDate from '@/components/CreatePlanRemindDate/CreatePlanRemindDate';
import ModalFixRemindDate from '@/components/ModalFixRemindDate/ModalFixRemindDate';
import { SESSION_STORAGE_KEY } from '@/constants';
import { RemindItemType, RemindOptionType } from '@/types/Remind';
import { decideRemindDate } from '@/utils/decideRemindDate';
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

  const [fixedMonthList, setFixedMonthList] = useState<number[]>([]);
  const [fixedDate, setFixedDate] = useState<number>(1);

  const [isFixRemindDateModalOpen, setIsFixRemindDateModalOpen] =
    useState(false);

  // nowStep=3에서, 다음 단계 버튼 누르면 실행되는 함수
  const goToLastStep = () => {
    // 모달에 연결되어있는 data들을 3번 단계에서 정한 주기, 범위, 날짜로 업데이트 시켜주고
    // 그 이후에 모달 open 상태를 true로 만들어주기
    const remindOptionsItem = sessionStorage.getItem(
      SESSION_STORAGE_KEY.STEP_3,
    );

    const remindOptions = remindOptionsItem
      ? (JSON.parse(remindOptionsItem) as RemindOptionType)
      : null; // null일수도 있음 ! 사용자가 지웠을 수도 있으니까

    if (remindOptions) {
      const fixedRemindDateList = decideRemindDate(
        remindOptions.TotalPeriod,
        remindOptions.Term,
        remindOptions.Date,
      );

      setFixedMonthList(
        fixedRemindDateList!.map((item) => {
          return item.month;
        }),
      );
      setFixedDate(remindOptions.Date);
      setIsFixRemindDateModalOpen(true);
    }
  };

  const onClickRemindDateModalYes = () => {
    // 모달에서 yes를 눌렀을 시, 3번 data를 바탕으로 정해진 날짜 - "" 를 4번 key에 대해 저장, 모달 닫기
    const remindOptionsItem = sessionStorage.getItem(
      SESSION_STORAGE_KEY.STEP_3,
    );

    const remindOptions = remindOptionsItem
      ? (JSON.parse(remindOptionsItem) as RemindOptionType)
      : null; // null일수도 있음 ! 사용자가 지웠을 수도 있으니까

    if (remindOptions) {
      const fixedRemindDateList = decideRemindDate(
        remindOptions.TotalPeriod,
        remindOptions.Term,
        remindOptions.Date,
      );

      const emptyRemindMessageList: RemindItemType[] = fixedRemindDateList!.map(
        (item) => {
          return {
            date: {
              month: item.month,
              day: item.day,
            },
            message: '',
          };
        },
      );

      sessionStorage.setItem(
        SESSION_STORAGE_KEY.STEP_4,
        JSON.stringify(emptyRemindMessageList),
      );
    }

    setIsFixRemindDateModalOpen(false);
    goToNextStep();
  };

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
              <CreatePlanIcon
                setIsFirstStepDataAllExist={(isExist: boolean) => {
                  setIsFirstStepDataAllExist(isExist);
                }}
              />
            );
        }
      })()}

      <StepButtonGroup
        nowStep={nowStep}
        goToPreviousStep={goToPreviousStep}
        goToNextStep={goToNextStep}
        goToLastStep={goToLastStep}
        isFirstStepDataAllExist={isFirstStepDataAllExist}
        isSecondStepDataAllExist={isSecondStepDataAllExist}
        isEveryStepDataAllExist={isEveryStepDataAllExist}
      />

      {isFixRemindDateModalOpen && (
        <ModalFixRemindDate
          fixedMonthList={fixedMonthList}
          fixedDate={fixedDate}
          onClickYes={onClickRemindDateModalYes}
          onClickNo={() => {
            setIsFixRemindDateModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
