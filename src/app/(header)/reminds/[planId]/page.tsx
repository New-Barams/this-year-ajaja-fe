'use client';

import { Button, DebounceSwitchButton, ReadOnlyRemindItem } from '@/components';
import { REMIND_TIME_TEXT } from '@/constants/remindTimeText';
import { useGetRemindQuery } from '@/hooks/apis/useGetRemindQuery';
import { useToggleIsRemindableMutation } from '@/hooks/apis/useToggleIsRemindable';
import { checkIsSeason } from '@/utils/checkIsSeason';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import React from 'react';
import './index.scss';

export default function RemindPage({ params }: { params: { planId: string } }) {
  const { planId } = params;
  const router = useRouter();

  const { remindData } = useGetRemindQuery(
    parseInt(planId, 10),
    checkIsSeason(),
  );

  const { mutate: toggleIsRemindableAPI } = useToggleIsRemindableMutation(
    parseInt(planId, 10),
  );

  const handleToggleIsRemindable = () => {
    toggleIsRemindableAPI(parseInt(planId, 10));
  };

  const onClickGoBackToPlan = () => {
    router.push(`/plans/${planId}`);
  };

  const onClickGoToEditRemind = () => {
    router.push(`/reminds/edit/${planId}`);
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
        <ul className={classNames(['remind-page__content__message-list'])}>
          {remindData.messagesResponses.map((item, index) => {
            return (
              <ReadOnlyRemindItem
                key={index}
                data={item}
                classNameList={['remind-page__content__message-item']}
              />
            );
          })}
        </ul>

        <p className={classNames(['remind-page__content__time'])}>
          현재{' '}
          <span className={classNames(['color-origin-primary'])}>
            {REMIND_TIME_TEXT[remindData.remindTime]}
          </span>
          에 리마인드를 받고 있어요!
        </p>

        <DebounceSwitchButton
          defaultIsOn={remindData.isRemindable}
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
