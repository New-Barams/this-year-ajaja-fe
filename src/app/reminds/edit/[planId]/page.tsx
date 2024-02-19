'use client';

import {
  Button,
  CreatePlanRemindDate,
  CreatePlanRemindMessage,
  ModalFixRemindDate,
} from '@/components';
import { EDIT_REMIND_STEP_TITLE } from '@/constants';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import useEditRemindPage from './hooks/useEditRemindPage';
import './index.scss';

export default function EditRemindPage({
  params,
}: {
  params: { planId: string };
}) {
  const { planId } = params;

  const {
    nowStep,
    goToPreviousStep,
    isEveryRemindDataExist,
    setIsEveryRemindDataExist,
    fixedMonthList,
    fixedDate,
    isFixRemindDateModalOpen,
    setIsFixRemindDateModalOpen,
    handleClickEditRemind,
    goToRemindMessageStep,
    onClickRemindDateModalYes,
  } = useEditRemindPage(planId);

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
