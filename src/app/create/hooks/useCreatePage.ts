import { ajajaToast } from '@/components/Toaster/customToast';
import { SESSION_STORAGE_KEY } from '@/constants';
import { canMakeNewPlanStore } from '@/stores/canMakeNewPlanStore';
import { RemindItemType, RemindOptionType } from '@/types';
import { decideRemindDate, getSessionStorageData } from '@/utils';
import { useRouter } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function useCreatePage() {
  const restartCreatePlan = () => {
    sessionStorage.removeItem(SESSION_STORAGE_KEY.STEP_1);
    sessionStorage.removeItem(SESSION_STORAGE_KEY.STEP_2);
    sessionStorage.removeItem(SESSION_STORAGE_KEY.STEP_3);
    sessionStorage.removeItem(SESSION_STORAGE_KEY.STEP_4);
  };

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

  useLayoutEffect(() => {
    if (!canMakeNewPlan) {
      router.replace('/home');
      ajajaToast.error('생성할 수 있는 계획의 수가 최대입니다.');
    }
  }, [canMakeNewPlan, router]);

  const [isFirstStepDataAllExist, setIsFirstStepDataAllExist] = useState(false);
  const [isSecondStepDataAllExist, setIsSecondStepDataAllExist] =
    useState(false);
  const [isLastStepDataAllExist, setIsLastStepDataAllExist] = useState(false);

  const [fixedMonthList, setFixedMonthList] = useState<number[]>([]);
  const [fixedDate, setFixedDate] = useState<number>(1);

  const isPreviousCreatePlanExist = () => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(SESSION_STORAGE_KEY.STEP_1) ? true : false;
    }
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

  return {
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
  };
}
