'use client';

import { Icon, RemindInput } from '@/components';
import { FeedbackItemData } from '@/types/Feedbacks';
import classNames from 'classnames';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import './index.scss';

interface FeedbackItemProps {
  data: FeedbackItemData;
  title: string;
  planId: number;
  remindTime: number;
  classNameList?: string[];
}

export default function FeedbackItem({
  data,
  title,
  planId,
  remindTime,
  classNameList = [],
}: FeedbackItemProps) {
  const { achieve, message, remindMonth, remindDay, reminded } = data;

  const canCheckRemindMessage = useMemo(() => {
    return reminded && message.length;
  }, [reminded, message.length]);

  const [isItemOpened, setIsItemOpened] = useState(false);

  const toggleIsItemOpened = () => {
    if (canCheckRemindMessage) {
      setIsItemOpened(!isItemOpened);
    }
  };

  return (
    <>
      {reminded && !message.length ? (
        <>
          <Link
            href={{
              pathname: '/feedback/evaluate',
              query: {
                title: title,
                month: remindMonth,
                day: remindDay,
                planId: planId,
              },
            }}
            className={classNames(
              'feedback-item__link',
              'background-origin-primary',
              'font-size-base',
              'color-origin-text-600',
              'border-round',
            )}>
            {remindMonth}월 {remindDay}일 피드백하기
          </Link>
          <div
            className={classNames(
              'color-origin-primary',
              'feedback-item__time',
            )}>
            <Icon name="ARROW_RIGHT" size="md" color="primary" />
            <p>
              {remindMonth + 1}월 {remindDay}일 {remindTime - 1}시 59분까지
              피드백 가능
            </p>
          </div>
        </>
      ) : (
        <li
          className={classNames(
            'feedback-item',
            {
              'feedback-item--disabled': !canCheckRemindMessage,
            },
            classNameList,
          )}>
          <div
            className={classNames('feedback-item__header')}
            onClick={toggleIsItemOpened}>
            <p
              className={classNames('feedback-item__header__title', {
                'feedback-item__header__title--lock': !canCheckRemindMessage,
              })}>
              {remindMonth}월 {remindDay}일 피드백
            </p>
            {!!achieve && (
              <p className="feedback-item__header__percent">{achieve}%</p>
            )}
            {canCheckRemindMessage ? (
              <Icon
                name={isItemOpened ? 'ITEM_CLOSE' : 'ITEM_OPEN'}
                size="md"
                color="gray-300"
                classNameList={['feedback-item__header__icon']}
              />
            ) : (
              <Icon
                name={'PLAN_CLOSE'}
                size="md"
                color="background"
                classNameList={['feedback-item__header__icon']}
              />
            )}
          </div>

          {isItemOpened && (
            <div
              className={classNames('feedback-item__message', {
                'feedback-item__message--open': isItemOpened,
              })}>
              <RemindInput textInput={message} editable={false} />
            </div>
          )}
        </li>
      )}
    </>
  );
}
