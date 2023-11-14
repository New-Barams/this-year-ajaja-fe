'use client';

import { Dropdown, IconSwitchButton } from '@/components';
import classNames from 'classnames';
import React from 'react';
import WritableRemindItem from '../../RemindItem/WritableRemindItem/WritableRemindItem';
import './index.scss';

type remindMessageListType = Array<{
  date: {
    month: number;
    day: number;
  };
  message: string;
}>;

type remindOptionType = {
  TotalPeriod: number;
  Term: number;
  Date: number;
  Time: number;
};

interface WritableRemindProps {
  isEditPage: boolean; // 계획 수정 페이지인지 여부 => 아니면 생성 페이지일 것임
  isRemindOn?: boolean; // 수정 페이지인경우에만 전달
  toggleIsRemindOn?: () => void; // 수정 페이지인경우에만 전달
  remindOption: remindOptionType; // 4개의 리마인드 옵션이 한 객체에 정의되어있음
  setRemindOption: (optionKey: string, newOptionValue: number) => void; // remindOption 객체 안 특정 키에 대한 value를 업데이트
  fixRemindOptions: () => void; // 확정 버튼 클릭 후 모달 클릭 시, 리마인드 옵션 4개에 따라 remindMessageList를 새로 다 설정해주는 함수
  remindMessageList: remindMessageListType;
  setRemindMessage: (month: number, day: number, newMessage: string) => void; // date에 해당하는 리마인드 메세지를 newMessage로 업데이트해주는 함수
  makeAllRemindMessageSame: () => void; // 모든 리마인드 메세지 동일하게 만드는 함수
}

// 리마인드 컴포넌트 내 자체적으로 가지고 있어야 할 것들
// 4개 옵션 배열
// 날짜 계산 함수 => {month: number, day: number} 객체를 여러개 가지고 있는 배열을 리턴해주는 함수 ?

const TOTAL_PERIOD_OPTIONS = [
  { value: 12, name: '1년' },
  { value: 6, name: '6개월' },
  { value: 3, name: '3개월' },
  { value: 1, name: '1개월' },
];

const TERM_OPTIONS = [
  { value: 12, name: '1년' },
  { value: 6, name: '6개월' },
  { value: 3, name: '3개월' },
  { value: 1, name: '1개월' },
];

const DATE_OPTIONS = Array.from({ length: 31 }, (_, index) => ({
  value: index + 1,
  name: `${index + 1}일`,
}));

const TIME_OPTIONS = [
  { value: 9, name: '9:00시' },
  { value: 13, name: '13:00시' },
  { value: 20, name: '20:00시' },
]; // 나중에 이를 서버에 전송할 때는 9 => "morning" 이런식으로 바꿔주는 함수 필요

// 계획 작성 페이지, 계획 수정 페이지에서 사용되는 리마인드 컴포넌트
export default function WritableRemind({
  isEditPage,
  isRemindOn,
  toggleIsRemindOn,
  remindOption,
  setRemindOption,
  remindMessageList,
  setRemindMessage,
  makeAllRemindMessageSame,
}: WritableRemindProps) {
  return (
    <div className={classNames('remind-item')}>
      {isEditPage ? (
        <div className={classNames('edit-page__title')}>
          <span className={classNames('edit-page__title__text')}>리마인드</span>
          <IconSwitchButton
            onIconName="NOTIFICATION_ON"
            offIconName="NOTIFICATION_OFF"
            onClick={toggleIsRemindOn!}
            isActive={isRemindOn!}
          />
          <span className={classNames('edit-page__title__remind-on')}>
            {isRemindOn ? '리마인드 알림 활성화' : '리마인드 알림 비활성화'}
          </span>
        </div>
      ) : (
        <div className={classNames('create-page__title')}>
          언제 리마인드 받고 싶나요?
        </div>
      )}

      <div className={classNames('remind-options')}>
        <Dropdown
          options={TOTAL_PERIOD_OPTIONS}
          selectedValue={remindOption.TotalPeriod}
          setSelectedValue={(newSelectedValue: number) => {
            setRemindOption('TotalPeriod', newSelectedValue);
          }}
        />
        <span>동안</span>
        <Dropdown
          options={TERM_OPTIONS}
          selectedValue={remindOption.Term}
          setSelectedValue={(newSelectedValue: number) => {
            setRemindOption('Term', newSelectedValue);
          }}
        />
        <span>마다 매달</span>
        <Dropdown
          options={DATE_OPTIONS}
          selectedValue={remindOption.Date}
          setSelectedValue={(newSelectedValue: number) => {
            setRemindOption('Date', newSelectedValue);
          }}
        />
        <Dropdown
          options={TIME_OPTIONS}
          selectedValue={remindOption.Time}
          setSelectedValue={(newSelectedValue: number) => {
            setRemindOption('Time', newSelectedValue);
          }}
        />
        <span>에 리마인드를 받을래요 !</span>
        <button className={classNames('remind-options__change-button')}>
          확정
        </button>
      </div>

      {remindMessageList.length !== 0 && ( // 메세지가 없을 때는 리스트 렌더링 x
        <>
          <div className={classNames('remind__message__title')}>
            리마인드 메세지를 작성해주세요 !
          </div>
          <div className={classNames('remind__message__list')}>
            {remindMessageList.map((item, index) => {
              return index === 0 ? ( // 첫 번째 아이템만 동일한 메세지 체크박스 렌더링 해줘야 함
                <WritableRemindItem
                  remindMonth={item.date.month}
                  remindDay={item.date.day}
                  remindMessage={item.message}
                  handleChangeRemindMessage={(text: string) => {
                    setRemindMessage(item.date.month, item.date.day, text);
                  }}
                  makeAllRemindMessageSame={makeAllRemindMessageSame}
                />
              ) : (
                <WritableRemindItem
                  remindMonth={item.date.month}
                  remindDay={item.date.day}
                  remindMessage={item.message}
                  handleChangeRemindMessage={(text: string) => {
                    setRemindMessage(item.date.month, item.date.day, text);
                  }}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
