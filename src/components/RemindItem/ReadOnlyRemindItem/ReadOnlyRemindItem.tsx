'use client';

import { Icon, RemindInput } from '@/components';
import CircleProgressBar from '@/components/CircleProgressBar/CircleProgressBar';
import { checkIsSeason } from '@/utils/checkIsSeason';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import './index.scss';

interface ReadOnlyRemindItemProps {
  remindMonth: number;
  remindDay: number;
  remindMessage: string;
  isReminded?: boolean; // 리마인드 받았는지 여부
  isFeedback?: boolean; // 피드백 했는지 여부
  feedbackId?: number;
  rate?: number;
  isExpired?: boolean; // 피드백 기간 만료되었는지 여부
  expireDate?: string;
  classNameList?: string[];
}

export default function ReadOnlyRemindItem({
  remindMonth,
  remindDay,
  remindMessage,
  isReminded = false, // 시즌아닐 때는 안 넘겨질텐데 리마인드 안 받은 것이므로 false가 기본값
  isFeedback = false,
  feedbackId,
  rate = 0,
  isExpired = false,
  expireDate,
  classNameList = [],
}: ReadOnlyRemindItemProps) {
  const isSeason = checkIsSeason();

  const canCheckRemindMessage = useMemo(() => {
    // 시즌O || 시즌X && 리마인드 받음o 일때만 리마인드 메세지 확인 가능
    return isSeason || (!isSeason && isReminded);
  }, [isSeason, isReminded]);

  const [isItemOpened, setIsItemOpened] = useState(false);
  const toggleIsItemOpened = () => {
    if (canCheckRemindMessage) {
      setIsItemOpened(!isItemOpened);
    }
  };

  const handleClickFeedBack = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (!isExpired && !isFeedback) {
      console.log(`${feedbackId}에 대한 피드백 평가 모달 띄우기`);
    }
    event.stopPropagation(); // item 토글 안 되도록
  };

  return (
    <>
      <div className={classNames('readonly-item', classNameList)}>
        <div className="readonly-item__header" onClick={toggleIsItemOpened}>
          {isReminded && !isFeedback && !isExpired && (
            <div
              className={classNames(
                'readonly-item__warning',
                'background-origin-primary',
              )}>
              <Icon name="WARNING" size="xs" color="white-100" />
              <span
                className={classNames(
                  'readonly-item__warning__text',
                  'color-origin-white-100',
                )}>
                {expireDate}까지 피드백하지 않으면 달성률이 0%로 반영됩니다
              </span>
            </div>
          )}

          <p className="readonly-item__title">
            {remindMonth}월 {remindDay}일에 {isReminded ? '받은 ' : '받을 '}
            리마인드 메세지
          </p>

          <div className="readonly-item__side">
            {isReminded && (
              <CircleProgressBar
                isFeedbackDone={isFeedback! || isExpired}
                percent={rate}
                onClick={handleClickFeedBack}
              />
            )}

            <span className="readonly-item__button-text">
              {canCheckRemindMessage ? '메세지 보기' : '아직 볼 수 없어요 !'}
            </span>

            {canCheckRemindMessage && (
              <Icon
                name={isItemOpened ? 'ITEM_CLOSE' : 'ITEM_OPEN'}
                size="xl"
                color="gray-300"
                classNameList={['readonly-item__opened__icon']}
              />
            )}
          </div>
        </div>

        {isItemOpened && (
          <div
            className={classNames(
              'readonly-item__message',
              'background-origin-white-300',
              {
                'remind-item__message--open': isItemOpened,
              },
            )}>
            <RemindInput textInput={remindMessage} editable={false} />
          </div>
        )}
      </div>
    </>
  );
}
