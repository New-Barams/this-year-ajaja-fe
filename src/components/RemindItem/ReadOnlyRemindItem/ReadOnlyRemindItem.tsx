'use client';

import ModalEvaluate from '@/app/(header)/plans/[planId]/_components/ModalEvaluate/ModalEvaluate';
import { Icon, Modal, RemindInput } from '@/components';
import CircleProgressBar from '@/components/CircleProgressBar/CircleProgressBar';
import { usePostFeedbackMutation } from '@/hooks/apis/usePostFeedbackMutation';
import { ReadOnlyRemindItemData } from '@/types/components/Remind';
import { checkIsSeason } from '@/utils/checkIsSeason';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import './index.scss';

interface ReadOnlyRemindItemProps {
  data: ReadOnlyRemindItemData;
  planId: number;
  classNameList?: string[];
}

export default function ReadOnlyRemindItem({
  data,
  planId,
  classNameList = [],
}: ReadOnlyRemindItemProps) {
  const isSeason = checkIsSeason();

  const { mutate: postFeedbackAPI } = usePostFeedbackMutation(planId);

  const {
    remindMonth,
    remindDate,
    remindMessage,
    isReminded,
    isFeedback,
    feedbackId,
    rate,
    isExpired,
    endMonth,
    endDate,
  } = data;

  const canCheckRemindMessage = useMemo(() => {
    // 시즌O || 시즌X && 리마인드 받음o 일때만 리마인드 메세지 확인 가능
    return isSeason || (!isSeason && isReminded);
  }, [isSeason, isReminded]);

  const [isItemOpened, setIsItemOpened] = useState(false);
  const [isFeedBackModalOpened, setIsFeedBackModalOpened] = useState(false);

  const toggleIsItemOpened = () => {
    if (canCheckRemindMessage) {
      setIsItemOpened(!isItemOpened);
    }
  };

  const handleClickFeedBackModalOpen = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (!isExpired && !isFeedback) {
      setIsFeedBackModalOpened(true);
    }
    event.stopPropagation(); // 상위 요소 item-header에 대한 onClick handler인 item 토글시키는 동작 안 되도록
  };

  const handleClickModalFinish = (rate: number) => {
    console.log(
      `${feedbackId}번 피드백에 대한 피드백 ${rate}%로 평가 완료 피드백 수행 API 호출`,
    );
    postFeedbackAPI({ feedbackId, body: { rate: rate } });
    setIsFeedBackModalOpened(false);
  };

  const handleClickModalExit = () => {
    setIsFeedBackModalOpened(false);
  };

  return (
    <>
      <li className={classNames('readonly-item', classNameList)}>
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
                {`${endMonth}월 ${endDate}일`}까지 피드백하지 않으면 달성률이
                0%로 반영됩니다
              </span>
            </div>
          )}

          <p className="readonly-item__title">
            {remindMonth}월 {remindDate}일에 {isReminded ? '받은 ' : '받을 '}
            리마인드 메세지
          </p>

          <div className="readonly-item__side">
            {isReminded && (
              <CircleProgressBar
                isFeedbackDone={isFeedback! || isExpired!}
                percent={rate}
                onClick={handleClickFeedBackModalOpen}
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
      </li>

      {isFeedBackModalOpened && (
        <Modal>
          <ModalEvaluate
            onClickFinish={handleClickModalFinish}
            onClickExit={handleClickModalExit}>
            {`${remindMonth}월 ${remindDate}일까지 계획을 얼마나 잘 이행했나요 ? `}
          </ModalEvaluate>
        </Modal>
      )}
    </>
  );
}
