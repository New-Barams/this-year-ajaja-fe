'use client';

import {
  Button,
  Dropdown,
  IconSwitchButton,
  Modal,
  ModalBasic,
  WritableRemindItem,
} from '@/components';
import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import {
  DATE_OPTIONS,
  TERM_OPTIONS,
  TIME_OPTIONS,
  TOTAL_PERIOD_OPTIONS,
} from '../constants/remindOptions';
import './index.scss';

interface remindOptionType {
  TotalPeriod: number;
  Term: number;
  Date: number;
  Time: number;
}
interface remindItemType {
  date: {
    month: number;
    day: number;
  };
  message: string;
}

interface WritableRemindProps {
  isEditPage: boolean;
  isRemindOn?: boolean;
  toggleIsRemindOn?: () => void;
  remindOption: remindOptionType;
  setRemindOption: (optionKey: string, newOptionValue: number) => void;
  fixRemindOptions: () => void;
  remindMessageList: remindItemType[];
  setRemindMessage: (month: number, day: number, newMessage: string) => void;
  makeAllRemindMessageSame: () => void;
}

export default function WritableRemind({
  isEditPage,
  isRemindOn,
  toggleIsRemindOn,
  remindOption,
  setRemindOption,
  fixRemindOptions,
  remindMessageList,
  setRemindMessage,
  makeAllRemindMessageSame,
}: WritableRemindProps) {
  const [isFixOptionsModalOpen, setIsFixOptionsModalOpen] = useState(false);

  const handleModalClickYes = () => {
    fixRemindOptions();
    setIsFixOptionsModalOpen(false);
  };

  const handleModalClickNo = () => {
    setIsFixOptionsModalOpen(false);
  };

  const filteredTermOptions = useMemo(() => {
    return TERM_OPTIONS.filter(
      (option) => option.value <= remindOption.TotalPeriod,
    );
  }, [remindOption.TotalPeriod]);

  useEffect(() => {
    if (remindOption.Term > remindOption.TotalPeriod) {
      setRemindOption('Term', 1);
    }
  }, [remindOption.TotalPeriod, remindOption.Term, setRemindOption]);

  return (
    <>
      <div className={classNames('writable-remind')}>
        {isEditPage ? (
          <div className={classNames('writable-remind--edit')}>
            <span className={classNames('writable-remind--edit__title')}>
              리마인드
            </span>
            <IconSwitchButton
              onIconName="NOTIFICATION_ON"
              offIconName="NOTIFICATION_OFF"
              onClick={toggleIsRemindOn!}
              isActive={isRemindOn!}
            />
            <span className={classNames('writable-remind--edit__toggle')}>
              {isRemindOn ? '리마인드 알림 활성화' : '리마인드 알림 비활성화'}
            </span>
          </div>
        ) : (
          <div className={classNames('writable-remind--create__title')}>
            언제 리마인드 받고 싶나요?
          </div>
        )}

        <div className={classNames('writable-remind__options')}>
          <Dropdown
            options={TOTAL_PERIOD_OPTIONS}
            selectedValue={remindOption.TotalPeriod}
            setSelectedValue={(newSelectedValue: number) => {
              setRemindOption('TotalPeriod', newSelectedValue);
            }}
            classNameList={['writable-remind__options__dropdown']}
          />
          <span className={classNames('writable-remind__options__text')}>
            동안
          </span>
          <Dropdown
            options={filteredTermOptions}
            selectedValue={remindOption.Term}
            setSelectedValue={(newSelectedValue: number) => {
              setRemindOption('Term', newSelectedValue);
            }}
            classNameList={['writable-remind__options__dropdown']}
          />
          <span className={classNames('writable-remind__options__text')}>
            마다 매달
          </span>
          <Dropdown
            options={DATE_OPTIONS}
            selectedValue={remindOption.Date}
            setSelectedValue={(newSelectedValue: number) => {
              setRemindOption('Date', newSelectedValue);
            }}
            classNameList={['writable-remind__options__dropdown']}
          />
          <Dropdown
            options={TIME_OPTIONS}
            selectedValue={remindOption.Time}
            setSelectedValue={(newSelectedValue: number) => {
              setRemindOption('Time', newSelectedValue);
            }}
            classNameList={['writable-remind__options__dropdown']}
          />
          <span className={classNames('writable-remind__options__text')}>
            에 리마인드를 받을래요 !
          </span>

          <Button
            background="primary"
            color="white-100"
            size="sm"
            border={false}
            onClick={() => {
              setIsFixOptionsModalOpen(true);
            }}>
            확정
          </Button>
        </div>

        {remindMessageList.length !== 0 && (
          <>
            <div className={classNames('writable-remind__message__title')}>
              리마인드 메세지를 작성해주세요 !
            </div>
            <ul className={classNames('writable-remind__message__list')}>
              {remindMessageList.map((item, index) => {
                return index === 0 ? (
                  <WritableRemindItem
                    key={index}
                    remindMonth={item.date.month}
                    remindDay={item.date.day}
                    remindMessage={item.message}
                    handleChangeRemindMessage={(text: string) => {
                      setRemindMessage(item.date.month, item.date.day, text);
                    }}
                    makeAllRemindMessageSame={makeAllRemindMessageSame}
                    classNameList={['writable-remind__message__item']}
                  />
                ) : (
                  <WritableRemindItem
                    key={index}
                    remindMonth={item.date.month}
                    remindDay={item.date.day}
                    remindMessage={item.message}
                    handleChangeRemindMessage={(text: string) => {
                      setRemindMessage(item.date.month, item.date.day, text);
                    }}
                    classNameList={['writable-remind__message__item']}
                  />
                );
              })}
            </ul>
          </>
        )}
      </div>
      {isFixOptionsModalOpen && (
        <Modal>
          <ModalBasic
            onClickYes={handleModalClickYes}
            onClickNo={handleModalClickNo}>
            리마인드 옵션 변경 시 작성한 리마인드 메세지가 모두 삭제됩니다. 정말
            확정하시겠습니까 ?
          </ModalBasic>
        </Modal>
      )}
    </>
  );
}
