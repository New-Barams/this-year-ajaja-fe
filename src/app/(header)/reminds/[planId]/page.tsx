'use client';

import { Button, DebounceSwitchButton } from '@/components';
import { useToggleIsRemindableMutation } from '@/hooks/apis/useToggleIsRemindable';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import React from 'react';
import './index.scss';

export default function RemindPage({ params }: { params: { planId: string } }) {
  const { planId } = params;
  const router = useRouter();

  // const { remindData } = useGetRemindQuery(
  //   parseInt(planId, 10),
  //   checkIsSeason(),
  // );

  const { mutate: toggleIsRemindableAPI } = useToggleIsRemindableMutation(
    parseInt(planId, 10),
  );

  const handleToggleIsRemindable = () => {
    toggleIsRemindableAPI(parseInt(planId, 10));
  };

  const onClickGoBackToPlan = () => {
    router.push(`/plan/${planId}`);
  };

  const onClickGoToEditRemind = () => {
    router.push(`/reminds/edits/${planId}`);
  };

  return (
    <div className={classNames(['remind-page'])}>
      <div className={classNames(['remind-page__title', 'font-size-xl'])}>
        리마인드
      </div>
      <p
        className={classNames(['remind-page__edit', 'font-size-sm'])}
        onClick={onClickGoToEditRemind}>
        수정
      </p>

      <div className={classNames(['remind-page__content'])}>
        <ul></ul>

        <p>
          <span>아침(09시)</span>에 리마인드를 받고 있어요!
        </p>

        <DebounceSwitchButton
          defaultIsOn={true}
          submitToggleAPI={handleToggleIsRemindable}
          toggleName="remind"
        />
      </div>

      <Button
        background="primary"
        color="white-100"
        border={false}
        onClick={onClickGoBackToPlan}
        classNameList={['remind-page__button']}>
        계획으로 돌아가기
      </Button>
    </div>
  );
}
