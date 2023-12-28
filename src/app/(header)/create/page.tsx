'use client';

import {
  CreatePlanContent,
  CreatePlanIcon,
  CreatePlanRemindDate,
  CreatePlanRemindMessage,
  ModalFixRemindDate,
} from '@/components';
import ModalContinueCreate from '@/components/ModalContinueCreate/ModalContinueCreate';
import { ajajaToast } from '@/components/Toaster/customToast';
import { SESSION_STORAGE_KEY } from '@/constants';
import { STEP_NAME } from '@/constants/createPlanStepTitle';
import { canMakeNewPlanStore } from '@/stores/canMakeNewPlanStore';
import { RemindItemType, RemindOptionType } from '@/types/Remind';
import { decideRemindDate } from '@/utils/decideRemindDate';
import { getSessionStorageData } from '@/utils/getSessionStorageData';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import StepButtonGroup from './_components/StepButtonGroup/StepButtonGroup';
import './index.scss';

const StepperComponent = dynamic(
  () => import('./_components/CreatePlanStepper/CreatePlanStepper'),
  {
    ssr: false,
  },
);

const restartCreatePlan = () => {
  sessionStorage.removeItem(SESSION_STORAGE_KEY.STEP_1);
  sessionStorage.removeItem(SESSION_STORAGE_KEY.STEP_2);
  sessionStorage.removeItem(SESSION_STORAGE_KEY.STEP_3);
  sessionStorage.removeItem(SESSION_STORAGE_KEY.STEP_4);
};

export default function CreatePage() {
  const router = useRouter();
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

  const canMakeNewPlan = useRecoilValue(canMakeNewPlanStore);

  useEffect(() => {
    if (!canMakeNewPlan) {
      // 계획이 4개 이상이면
      ajajaToast.error('더 이상 계획을 생성할 수 없습니다!');
      router.replace('/home');
    }
  }, [router, canMakeNewPlan]);

  const [isFirstStepDataAllExist, setIsFirstStepDataAllExist] = useState(false);
  const [isSecondStepDataAllExist, setIsSecondStepDataAllExist] =
    useState(false);
  const [isLastStepDataAllExist, setIsLastStepDataAllExist] = useState(false);

  const [fixedMonthList, setFixedMonthList] = useState<number[]>([]);
  const [fixedDate, setFixedDate] = useState<number>(1);

  const isPreviousCreatePlanExist = () => {
    return sessionStorage.getItem(SESSION_STORAGE_KEY.STEP_1) ? true : false;
  };

  const [isContinueCreatePlanModalOpen, setIsContinueCreatePlanModalOpen] =
    useState(isPreviousCreatePlanExist());

  const onClickContinueCreateModalYes = () => {
    // 이어서 작성하기 - 모달만 닫기
    setIsContinueCreatePlanModalOpen(false);
  };

  const onClickContinueCreateModalNo = () => {
    // 새로 작성하기 - 모든 step 세션 스토리지 값 삭제 후 모달 닫기
    restartCreatePlan();
    setIsContinueCreatePlanModalOpen(false);
  };

  const [isFixRemindDateModalOpen, setIsFixRemindDateModalOpen] =
    useState(false);

  // 3 => 4단계 다음단계 버튼 클릭 시 실행되는 함수
  // 날짜 확정 모달에 렌더링 될 data들을 3단계에서 정한 주기, 범위, 날짜로 업데이트 시켜주고 모달 열기
  const goToLastStep = () => {
    const remindOptions = getSessionStorageData(
      'STEP_3',
    ) as RemindOptionType | null;

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

  // 날짜 확정 모달에서 yes를 눌렀을 시 실행되는 함수
  // 3단계 data를 바탕으로 정해진 날짜와 비어있는 메세지 "" 를 4단계 session data로 저장, 모달 닫기
  const onClickRemindDateModalYes = () => {
    const remindOptionsItem = sessionStorage.getItem(
      SESSION_STORAGE_KEY.STEP_3,
    );

    const remindOptions = remindOptionsItem
      ? (JSON.parse(remindOptionsItem) as RemindOptionType)
      : null;

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
