'use client';

import { Icon, RemindInput } from '@/components';
import { ReadOnlyRemindItemData } from '@/types/Remind';
import { checkIsSeason } from '@/utils/checkIsSeason';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import './index.scss';

interface ReadOnlyRemindItemProps {
  data: ReadOnlyRemindItemData;
  classNameList?: string[];
}

export default function ReadOnlyRemindItem({
  data,
  classNameList = [],
}: ReadOnlyRemindItemProps) {
  const isSeason = checkIsSeason();

  const { remindMonth, remindDate, remindMessage, isReminded } = data;

  const canCheckRemindMessage = useMemo(() => {
    return isSeason || (!isSeason && isReminded);
  }, [isSeason, isReminded]);

  const [isItemOpened, setIsItemOpened] = useState(false);

  const toggleIsItemOpened = () => {
    if (canCheckRemindMessage) {
      setIsItemOpened(!isItemOpened);
    }
  };

  return (
    <>
      <li className={classNames('readonly-item', classNameList)}>
        <div
          className={classNames('readonly-item__content', {
            'readonly-item__content--isReminded': isReminded,
          })}
          onClick={toggleIsItemOpened}>
          <p
            className={classNames('readonly-item__content__title', {
              'readonly-item__content__title--isReminded': isReminded,
            })}>
            {remindMonth}월 {remindDate}일 메세지
          </p>

          {canCheckRemindMessage ? (
            <Icon
              name={isItemOpened ? 'ITEM_CLOSE' : 'ITEM_OPEN'}
              size="xl"
              color="gray-300"
              classNameList={['readonly-item__content__icon']}
            />
          ) : (
            <Icon
              name={'PLAN_CLOSE'}
              size="xl"
              color="gray-300"
              classNameList={['readonly-item__content__icon']}
            />
          )}

          {isItemOpened && (
            <div
              className={classNames('readonly-item__message', {
                'remind-item__message--open': isItemOpened,
              })}>
              <RemindInput textInput={remindMessage} editable={false} />
            </div>
          )}
        </div>
      </li>
    </>
  );
}
