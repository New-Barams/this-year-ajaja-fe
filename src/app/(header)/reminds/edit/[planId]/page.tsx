'use client';

import {
  Button,
  CreatePlanRemindDate,
  CreatePlanRemindMessage,
  ModalFixRemindDate,
} from '@/components';
import { ajajaToast } from '@/components/Toaster/customToast';
import { SESSION_STORAGE_KEY } from '@/constants';
import { useGetRemindQuery } from '@/hooks/apis/useGetRemindQuery';
import { RemindItemType, RemindOptionType } from '@/types/Remind';
import { checkIsSeason } from '@/utils/checkIsSeason';
import { decideRemindDate } from '@/utils/decideRemindDate';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
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

  const [originTerm, setOriginTerm] = useState(1);
  const [originPeriod, setOriginPeriod] = useState(1);

  useEffect(() => {
    setOriginTerm(remindData.remindTerm);
    console.log(`remindTerm: ${remindData.remindTerm}로 변경`);
  }, [remindData.remindTerm]);

  useEffect(() => {
    setOriginPeriod(remindData.remindTotalPeriod);
    console.log(`remindPeriod: ${remindData.remindTotalPeriod}로 변경`);
  }, [remindData.remindTotalPeriod]);

  const [nowStep, setNowStep] = useState(1);
  const [isEveryRemindDateExist, setIsEveryRemindDateExist] = useState(false);
  const [fixedMonthList, setFixedMonthList] = useState<number[]>([]);
  const [fixedDate, setFixedDate] = useState<number>(1);
  const [isFixRemindDateModalOpen, setIsFixRemindDateModalOpen] =
    useState(false);

  useEffect(() => {
    // 맨 처음 렌더링 시에만 실행 => 이 로직이 위 remindData 받아온 이후에 실행되어야 함
    sessionStorage.removeItem(SESSION_STORAGE_KEY.EDIT_REMIND_OPTION);
    sessionStorage.setItem(
      SESSION_STORAGE_KEY.EDIT_REMIND_OPTION,
      JSON.stringify({
        TotalPeriod: remindData.remindTotalPeriod,
        Term: remindData.remindTerm,
        Date: remindData.remindDate,
        Time: remindData.remindTime,
      }),
    );

    sessionStorage.removeItem(SESSION_STORAGE_KEY.EDIT_REMIND_MESSAGE);
    sessionStorage.setItem(
      SESSION_STORAGE_KEY.EDIT_REMIND_MESSAGE,
      JSON.stringify(
        remindData.messagesResponses.map((message) => {
          return {
            date: {
              month: message.remindMonth,
              day: message.remindDay,
            },
            message: message.remindMessage,
          };
        }),
      ),
    );
  }, []);

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

  const exitEditRemindPage = () => {
    router.push(`/reminds/${planId}`);
  };

  const handleClickEditRemind = (isEveryRemindDataExist: boolean) => {
    if (isEveryRemindDataExist) {
      // TODO: session Storage에서 data 가지고 api 실행

      ajajaToast.success('리마인드 수정 API 실행');
      router.push('/home');
    } else {
      ajajaToast.error('모든 항목을 입력해주세요!');
    }
  };

  // 리마인드 날짜 수정 => 메세지 수정으로 넘어가기 위해 다음 단계 눌렀을 때 실행되는 함수
  const goToRemindMessageStep = () => {
    const editRemindOptionsItem = sessionStorage.getItem(
      SESSION_STORAGE_KEY.EDIT_REMIND_OPTION,
    );

    const editRemindOptions = editRemindOptionsItem
      ? (JSON.parse(editRemindOptionsItem) as RemindOptionType)
      : null;

    if (
      editRemindOptions?.Term === originTerm &&
      editRemindOptions?.TotalPeriod === originPeriod
    ) {
      // 1. 4번 세션에 대한 session Data를 업데이트 해줘야 함 => 주기, 범위 외에 시간이랑 날짜 바뀌었을 수도 있으므로
      const remindMessageItem = sessionStorage.getItem(
        SESSION_STORAGE_KEY.STEP_4,
      );

      // 기존 4번에 대한 리마인드 메세지 리스트에 접근
      const remindMessage = remindMessageItem
        ? (JSON.parse(remindMessageItem) as RemindItemType[])
        : null;

      if (remindMessage) {
        // 변경된 날짜에 대한 새로운 리마인드 메세지 리스트 만들기
        // 일단 날짜 다시 만들고
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

      // step + 1
      goToNextStep();
    } else {
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

  const onClickRemindDateModalYes = () => {
    const remindOptionsItem = sessionStorage.getItem(
      SESSION_STORAGE_KEY.EDIT_REMIND_OPTION,
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
        SESSION_STORAGE_KEY.EDIT_REMIND_MESSAGE,
        JSON.stringify(emptyRemindMessageList),
      );

      // origin에 대한 값을 최신의 period, term으로 교체 => 다시 뒤로가기 할 수도 있으므로
      console.log(`모달 close => period: ${remindOptions.TotalPeriod}로 변경`);
      console.log(`모달 close => term: ${remindOptions.Term}로 변경`);
      setOriginPeriod(remindOptions.TotalPeriod);
      setOriginTerm(remindOptions.Term);

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
        리마인드 날짜 수정
      </div>

      {nowStep === 1 ? (
        <CreatePlanRemindDate isCreateOrEditPage="edit" />
      ) : (
        <CreatePlanRemindMessage
          setIsLastStepDataAllExist={setIsEveryRemindDateExist}
          isCreateOrEditPage="edit"
        />
      )}

      <div className={classNames(['remind-edit-page__button'])}>
        {nowStep === 1 ? (
          <>
            <Button
              background="white-100"
              border={true}
              color="primary"
              onClick={() => {
                exitEditRemindPage();
              }}
              size="sm">
              나가기
            </Button>
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
                handleClickEditRemind(isEveryRemindDateExist);
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
        />
      )}
    </div>
  );
}
