'use client';

import { Button, DebounceSwitchButton, ReadOnlyRemindItem } from '@/components';
import { REMIND_TIME_TEXT } from '@/constants';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import useRemindPage from './hooks/useRemindPage';
import './index.scss';

export default function RemindPage({ params }: { params: { planId: string } }) {
  const { planId } = params;
  const {
    isSeason,
    remindData,
    handleToggleIsRemindable,
    onClickGoBackToPlanPage,
  } = useRemindPage(planId);

  return (
    <div className={classNames(['remind-page'])}>
      <div
        className={classNames([
          'remind-page__breadcrumb',
          'font-size-base',
          'color-origin-text-100',
        ])}>
        {<Link href="/home">홈</Link>}
        &gt;
        {<Link href={`/plans/${planId}`}>계획</Link>}
        &gt;
        <span>리마인드</span>
      </div>

      <div className={classNames(['remind-page__title', 'font-size-xl'])}>
        리마인드
      </div>
      {isSeason && (
        <Link
          href={`/reminds/edit/${planId}`}
          className={classNames(['remind-page__edit', 'font-size-sm'])}>
          수정
        </Link>
      )}

      <div className={classNames(['remind-page__content'])}>
        <ul className={classNames(['remind-page__content__message-list'])}>
          {remindData.messageResponses.map((item, index) => {
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
          defaultIsOn={remindData.remindable}
          submitToggleAPI={handleToggleIsRemindable}
          toggleName="remind"
        />

        <Link href={`/plans/${planId}`}>
          <Button
            background="primary"
            color="white-100"
            border={false}
            onClick={onClickGoBackToPlanPage}
            classNameList={['remind-page__button']}>
            계획으로 돌아가기
          </Button>
        </Link>
      </div>
    </div>
  );
}
