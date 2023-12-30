'use client';

import {
  Button,
  CreatePlanRemindDate,
  CreatePlanRemindMessage,
  ModalFixRemindDate,
} from '@/components';
import { ajajaToast } from '@/components/Toaster/customToast';
import { EDIT_REMIND_STEP_TITLE, SESSION_STORAGE_KEY } from '@/constants';
import { useEditRemindMutation } from '@/hooks/apis/useEditRemindMutation';
import { useGetRemindQuery } from '@/hooks/apis/useGetRemindQuery';
import { RemindItemType, RemindOptionType } from '@/types/Remind';
import { EditRemindData } from '@/types/apis/plan/EditRemind';
import { changeRemindTimeToString } from '@/utils/changeRemindTimeToString';
import { checkIsSeason } from '@/utils/checkIsSeason';
import { decideRemindDate } from '@/utils/decideRemindDate';
import { getSessionStorageData } from '@/utils/getSessionStorageData';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useEditRemindPage } from './_hooks/useEditRemindPage';
import './index.scss';

export default function EditRemindPage({
  params,
}: {
  params: { planId: string };
}) {
  const { planId } = params;
  const router = useRouter();

  const { remindData } = useGetRemindQuery(
    parseInt(planId, 10),
    checkIsSeason(),
  );

  const { originTerm, setOriginTerm, originPeriod, setOriginPeriod } =
    useEditRemindPage(remindData);

  const [nowStep, setNowStep] = useState(1);
  const [isEveryRemindDataExist, setIsEveryRemindDataExist] = useState(false);
  const [fixedMonthList, setFixedMonthList] = useState<number[]>([]);
  const [fixedDate, setFixedDate] = useState<number>(1);
  const [isFixRemindDateModalOpen, setIsFixRemindDateModalOpen] =
    useState(false);

  const goToPreviousStep = () => {
    if (nowStep > 1) {
      setNowStep(nowStep - 1);
    }
  };

  const goToNextStep = () => {
    if (nowStep < 2) {
      setNowStep(nowStep + 1);
    }
  };

  const { mutate: editRemindAPI } = useEditRemindMutation(parseInt(planId, 10));

  // 수정 완료 버튼 클릭 시 실행되는 함수
  const handleClickEditRemind = (isEveryRemindDataExist: boolean) => {
    if (isEveryRemindDataExist) {
      const editRemindOptions = getSessionStorageData(
        'EDIT_REMIND_OPTION',
      ) as RemindOptionType | null;

      const editRemindMessage = getSessionStorageData('EDIT_REMIND_MESSAGE') as
        | RemindItemType[]
        | null;

      // 세션에 리마인드 옵션, 메시지에 대한 정보가 모두 존재할 때
      if (editRemindOptions && editRemindMessage) {
        const editRemindData: EditRemindData = {
          remindTotalPeriod: editRemindOptions.TotalPeriod,
          remindTerm: editRemindOptions.Term,
          remindDate: editRemindOptions.Date,
          remindTime: changeRemindTimeToString(editRemindOptions.Time),
          messages: editRemindMessage.map((item) => {
            return {
              content: item.message,
              remindMonth: item.date.month,
              remindDay: item.date.day,
            };
          }),
        };

        editRemindAPI({
          planId: parseInt(planId, 10),
          remindData: editRemindData,
        });
      }
      router.push('/home');
    } else {
      ajajaToast.error('모든 항목을 입력해주세요!');
    }
  };

  // 리마인드 날짜 수정 => 메세지 수정으로 넘어가기 위해 다음 단계 눌렀을 때 실행되는 함수
  const goToRemindMessageStep = () => {
    const editRemindOptions = getSessionStorageData(
      'EDIT_REMIND_OPTION',
    ) as RemindOptionType | null;

    if (
      // 1. 주기, 범위가 바뀌지 않았다면 => 메세지 내용은 유지, 다른 정보는 바뀌었다면 업데이트 하기
      editRemindOptions?.Term === originTerm &&
      editRemindOptions?.TotalPeriod === originPeriod
    ) {
      // 기존 4번에 대한 리마인드 메세지 리스트에 접근
      const remindMessage = getSessionStorageData('EDIT_REMIND_MESSAGE') as
        | RemindItemType[]
        | null;

      if (remindMessage) {
        // 변경되었을 수도 있는 날짜에 대한 새로운 리마인드 메세지 리스트 만들기
        const fixedRemindDateList = decideRemindDate(
          editRemindOptions.TotalPeriod,
          editRemindOptions.Term,
          editRemindOptions.Date,
        );

        // 새로운 메세지 리스트인데, 월과 날짜가 달라졌을 수도 있으므로 새로 만들고, 메세지는 동일하게
        const newRemindMessageList = remindMessage.map((item, index) => {
          return {
            date: {
              month: fixedRemindDateList![index].month,
              day: fixedRemindDateList![index].day,
            },
            message: item.message,
          };
        });

        sessionStorage.setItem(
          SESSION_STORAGE_KEY.EDIT_REMIND_MESSAGE,
          JSON.stringify(newRemindMessageList),
        );
      }

      goToNextStep();
    } else {
      // 2. 주기, 범위가 바뀌었다면 => 메세지가 유지되지 않고 바뀐다는 모달 띄워주기
      if (editRemindOptions) {
        const fixedRemindDateList = decideRemindDate(
          editRemindOptions.TotalPeriod,
          editRemindOptions.Term,
          editRemindOptions.Date,
        );

        setFixedMonthList(
          fixedRemindDateList!.map((item) => {
            return item.month;
          }),
        );
        setFixedDate(editRemindOptions.Date);
        setIsFixRemindDateModalOpen(true);
      }
    }
  };

  // 리마인드 날짜 확정 모달에서 yes 클릭 시 실행되는 함수
  // => 새로 설정된 리마인드 날짜에 따라 메세지를 "" 로 연결
  const onClickRemindDateModalYes = () => {
    const editRemindOptions = getSessionStorageData(
      'EDIT_REMIND_OPTION',
    ) as RemindOptionType | null;

    if (editRemindOptions) {
      const fixedRemindDateList = decideRemindDate(
        editRemindOptions.TotalPeriod,
        editRemindOptions.Term,
        editRemindOptions.Date,
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
        SESSION_STORAGE_KEY.EDIT_REMIND_MESSAGE,
        JSON.stringify(emptyRemindMessageList),
      );

      setOriginPeriod(editRemindOptions.TotalPeriod);
      setOriginTerm(editRemindOptions.Term);

      setIsFixRemindDateModalOpen(false);
      goToNextStep();
    }
  };

  return (
    <div className={classNames(['remind-edit-page'])}>
      <div
        className={classNames([
          'remind-edit-page__breadcrumb',
          'font-size-base',
          'color-origin-text-100',
        ])}>
        {<Link href="/home">홈</Link>}
        &gt;
        {<Link href={`/plans/${planId}`}>계획</Link>}
        &gt;
        {<Link href={`/reminds/${planId}`}>리마인드</Link>}
        &gt;
        <span>리마인드 수정</span>
      </div>

      <div className={classNames(['remind-edit-page__title'])}>
        {EDIT_REMIND_STEP_TITLE[nowStep]}
      </div>

      {nowStep === 1 ? (
        <CreatePlanRemindDate isCreateOrEditPage="edit" />
      ) : (
        <CreatePlanRemindMessage
          setIsLastStepDataAllExist={setIsEveryRemindDataExist}
          isCreateOrEditPage="edit"
        />
      )}

      <div className={classNames(['remind-edit-page__button'])}>
        {nowStep === 1 ? (
          <>
            <Link
              href={`/reminds/${planId}`}
              className={classNames(['remind-edit-page__button__out'])}>
              <Button
                background="white-100"
                border={true}
                color="primary"
                size="sm">
                나가기
              </Button>
            </Link>
            <Button
              background="primary"
              border={false}
              color="white-100"
              onClick={() => {
                goToRemindMessageStep();
              }}>
              다음 단계
            </Button>
          </>
        ) : (
          <>
            <Button
              background="white-100"
              border={true}
              color="primary"
              onClick={() => {
                goToPreviousStep();
              }}
              size="sm">
              이전 단계
            </Button>
            <Button
              background="primary"
              border={false}
              color="white-100"
              onClick={() => {
                handleClickEditRemind(isEveryRemindDataExist);
              }}>
              수정 완료
            </Button>
          </>
        )}
      </div>

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
          isPeriodOrTermChanged={true}
        />
      )}
    </div>
  );
}
