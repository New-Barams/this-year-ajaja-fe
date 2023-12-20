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

  const { remindMonth, remindDay, remindMessage, isReminded } = data;

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
      <li
        className={classNames(
          'readonly-item',
          {
            'readonly-item--disabled': !canCheckRemindMessage,
          },
          classNameList,
        )}>
        <div
          className={classNames('readonly-item__header')}
          onClick={toggleIsItemOpened}>
          <p
            className={classNames('readonly-item__header__title', {
              'readonly-item__header__title--lock': !canCheckRemindMessage,
            })}>
            {remindMonth}월 {remindDay}일 메세지
          </p>

          {canCheckRemindMessage ? (
            <Icon
              name={isItemOpened ? 'ITEM_CLOSE' : 'ITEM_OPEN'}
              size="md"
              color="gray-300"
              classNameList={['readonly-item__header__icon']}
            />
          ) : (
            <Icon
              name={'PLAN_CLOSE'}
              size="md"
              color="background"
              classNameList={['readonly-item__header__icon']}
            />
          )}
        </div>

        {isItemOpened && (
          <div
            className={classNames('readonly-item__message', {
              'remind-item__message--open': isItemOpened,
            })}>
            <RemindInput textInput={remindMessage} editable={false} />
          </div>
        )}
      </li>
    </>
  );
}
