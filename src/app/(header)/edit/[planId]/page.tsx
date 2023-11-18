'use client';

import { Button, WritableRemind } from '@/components';
import { PlanData } from '@/components/ReadOnlyPlan/ReadOnlyPlan';
import WritablePlan from '@/components/WritablePlan/WritablePlan';
import {
  RemindData,
  RemindItemType,
  RemindOptionType,
} from '@/types/components/Remind';
import { decideRemindDate } from '@/utils/decideRemindDate';
import classNames from 'classnames';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import './index.scss';

type EditPlanData = {
  title: string;
  description: string;
  remindTotalPeriod: number;
  remindTerm: number;
  remindDate: number;
  remindTime: number;
  isPublic: boolean;
  canRemind: boolean;
  canAjaja: boolean;
  tags: string[];
  messages: string[];
};

export default function EditPage({ params }: { params: { planId: string } }) {
  const { planId } = params;

  // 1. 서버에서 planId에 해당하는 계획, 리마인드 data 받아오기
  const planData: PlanData = {
    id: 123, //계힉 Id
    userId: 123, // 유저 Id
    nickname: 'nononoere', // 유저 닉네임
    title: '계획 제목 테스트', //계획 타이틀
    description: '계획 설명 테스트', // 계획 설명
    isPublic: true, // 공개여부
    tags: ['태그1', '태그1', '태그1', '태그1', '태그1'], // tag 리스트,  태그는 타입 변경 예정
    ajajas: 100, // 아좌좌 개수
    isAjajaOn: true, // 아좌좌 클릭 여부
    isCanAjaja: true, // 응원 메세지 알람 여부
    createdAt: '2023-06-15', // 계획 생성 일자
  };

  const remindData: RemindData = {
    isRemindable: true,
    remindTime: 9,
    remindDate: 1,
    remindTerm: 1,
    remindTotalPeriod: 12,
    remindMessageList: [
      {
        remindMonth: 3,
        remindDate: 15,
        remindMessage: '리마인드 받았지만 만료되서 피드백 0%로 처리 ',
        isReminded: true,
        isFeedback: false,
        feedbackId: 12,
        rate: 0,
        isExpired: true,
        endMonth: 12,
        endDate: 1,
      },
      {
        remindMonth: 6,
        remindDate: 15,
        remindMessage: '리마인드 받아서 피드백함',
        isReminded: true,
        isFeedback: true,
        feedbackId: 12,
        rate: 75,
        isExpired: true,
        endMonth: 12,
        endDate: 1,
      },
      {
        remindMonth: 9,
        remindDate: 15,
        remindMessage: '예시',
        isReminded: true,
        isFeedback: false,
        feedbackId: 12,
        rate: 0,
        isExpired: false,
        endMonth: 12,
        endDate: 1,
      },
      {
        remindMonth: 12,
        remindDate: 15,
        remindMessage: '예시',
        isReminded: false,
        isFeedback: false,
        feedbackId: 12,
        rate: 0,
        isExpired: false,
        endMonth: 12,
        endDate: 1,
      },
    ],
  };

  // 2. 계획 수정을 위해 관리되어야 하는 state 및 핸들러의 기본값에 1번에서 받은 값을 넣어준다.
  const [title, setTitle] = useState(planData.title);
  const [description, setDescription] = useState(planData.description);
  const [tags, setTags] = useState<string[]>(planData.tags);
  const [isPublic, setPublic] = useState(planData.isPublic);
  const toggleIsPublic = () => {
    setPublic(!isPublic);
  };
  const [canAjaja, setCanAjaja] = useState(planData.isCanAjaja);
  const toggleCanAjaja = () => {
    setCanAjaja(!canAjaja);
  };

  const [isRemindOn, setIsRemindOn] = useState(remindData.isRemindable);
  const toggleIsRemindOn = () => {
    setIsRemindOn(!isRemindOn);
  };

  const [remindOptions, setRemindOptions] = useState<RemindOptionType>({
    TotalPeriod: remindData.remindTotalPeriod,
    Term: remindData.remindTerm,
    Date: remindData.remindDate,
    Time: remindData.remindTime,
  });

  const handleChangeRemindOption = (
    optionKey: string,
    newOptionValue: number,
  ) => {
    setRemindOptions({
      ...remindOptions,
      [optionKey]: newOptionValue,
    });
  };

  const [remindMessageList, setRemindMessageList] = useState<RemindItemType[]>(
    remindData.remindMessageList.map((remindItem) => {
      return {
        date: {
          month: remindItem.remindMonth,
          day: remindItem.remindDate,
        },
        message: remindItem.remindMessage,
      };
    }),
  );

  const handleChangeRemindMessage = (
    month: number,
    day: number,
    newMessage: string,
  ) => {
    const newRemindList = remindMessageList.map((item) => {
      if (item.date.month === month && item.date.day === day) {
        return { ...item, message: newMessage };
      }
      return item;
    });

    setRemindMessageList(newRemindList);
  };

  const fixRemindOptions = () => {
    const fixedRemindDate = decideRemindDate(
      remindOptions.TotalPeriod,
      remindOptions.Term,
      remindOptions.Date,
    );

    const newRemindMessageList: RemindItemType[] = [];
    fixedRemindDate?.forEach((newDate) => {
      newRemindMessageList.push({
        date: {
          month: newDate.month,
          day: newDate.day,
        },
        message: '',
      });
    });

    setRemindMessageList(newRemindMessageList);
  };

  const makeAllRemindMessageSame = useCallback(() => {
    if (remindMessageList.length <= 1) {
      return;
    }

    const firstRemindMessage = remindMessageList[0].message;
    const updatedList = remindMessageList.map((item) => {
      return { ...item, message: firstRemindMessage };
    });

    setRemindMessageList(updatedList);
  }, [remindMessageList]);

  // 모든 리마인드 메세지가 다 작성되어 있는지 여부
  const isAllRemindMessageExists =
    remindMessageList.length > 0 &&
    remindMessageList.every((remindItem) => remindItem.message.length > 0);

  // 작성 완료 버튼을 누를 수 있는 조건
  const isEditPossible =
    isAllRemindMessageExists && title.length !== 0 && description.length !== 0;

  // 3. 수정된 state들을 가지고 호출하는 계획 수정 API
  const editPlan = () => {
    const editPlanData: EditPlanData = {
      title: title,
      description: description,
      remindTotalPeriod: remindOptions.TotalPeriod,
      remindTerm: remindOptions.Term,
      remindDate: remindOptions.Date,
      remindTime: remindOptions.Time,
      isPublic: isPublic,
      canRemind: isRemindOn,
      canAjaja: canAjaja,
      tags: tags,
      messages: remindMessageList.map((messageItem) => {
        return messageItem.message;
      }),
    };

    console.log(
      `${planId}에 해당하는 계획을 ${editPlanData}의 data로 수정하는 계획 수정 API 호출 `,
    );
  };

  return (
    <div className={classNames('edit-page')}>
      <WritablePlan
        isEditPage={true}
        isPublic={isPublic}
        onToggleIsPublic={toggleIsPublic}
        title={title}
        description={description}
        onChangeTitle={setTitle}
        onChangeDescription={setDescription}
        tags={tags}
        changeTags={setTags}
        ajajas={planData.ajajas}
        isAjajaOn={planData.isAjajaOn}
        canAjaja={canAjaja}
        onToggleCanAjaja={toggleCanAjaja}
      />

      <WritableRemind
        isEditPage={true}
        isRemindOn={isRemindOn}
        toggleIsRemindOn={toggleIsRemindOn}
        remindOption={remindOptions}
        setRemindOption={handleChangeRemindOption}
        fixRemindOptions={fixRemindOptions}
        remindMessageList={remindMessageList}
        setRemindMessage={handleChangeRemindMessage}
        makeAllRemindMessageSame={makeAllRemindMessageSame}
      />

      <div className={classNames('edit-page__button__container')}>
        <Button
          background={isEditPossible ? 'primary' : 'gray-200'}
          color="white-100"
          size="lg"
          border={false}
          onClick={editPlan}
          disabled={!isEditPossible}>
          수정 완료
        </Button>
        <Link href={`/plans/${planId}`}>
          <Button
            background="primary"
            color="white-100"
            size="lg"
            border={false}>
            나가기
          </Button>
        </Link>
      </div>
    </div>
  );
}
