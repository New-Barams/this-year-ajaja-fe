'use client';

import { Button, Modal, WritableRemind } from '@/components';
import ModalExit from '@/components/Modal/ModalExit';
import WritablePlan from '@/components/WritablePlan/WritablePlan';
import { usePostNewPlanMutation } from '@/hooks/apis/usePostNewPlanMutation';
import { PostNewPlanRequestBody } from '@/types/apis/plan/PostNewPlan';
import { RemindItemType, RemindOptionType } from '@/types/components/Remind';
import { changeRemindTimeToString } from '@/utils/changeRemindTimeToString';
import { decideRandomIconNumber } from '@/utils/decideRandomIconNumber';
import { decideRemindDate } from '@/utils/decideRemindDate';
import classNames from 'classnames';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import './index.scss';

export default function CreatePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isPublic, setPublic] = useState(true);
  const toggleIsPublic = () => {
    setPublic(!isPublic);
  };

  const [remindOptions, setRemindOptions] = useState<RemindOptionType>({
    TotalPeriod: 12,
    Term: 1,
    Date: 1,
    Time: 9,
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
    [],
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

  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  // 리마인드 옵션 확정버튼 클릭 시 이에 따라 리마인드 날짜 생성 및 리마인드 아이템 렌더링해주는 함수
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

  const isAllRemindMessageExists =
    remindMessageList.length > 0 &&
    remindMessageList.every((remindItem) => remindItem.message.length > 0);

  const isCreatePossible =
    isAllRemindMessageExists && title.length !== 0 && description.length !== 0;

  // 계획 생성 API 부분
  const { mutate: createNewPlanAPI } = usePostNewPlanMutation();
  const handleCreateNewPlan = () => {
    const data: PostNewPlanRequestBody = {
      iconNumber: decideRandomIconNumber(),
      isPublic: isPublic,
      title: title,
      description: description,
      tags: tags,
      remindTotalPeriod: remindOptions.TotalPeriod,
      remindTerm: remindOptions.Term,
      remindDate: remindOptions.Date,
      remindTime: changeRemindTimeToString(remindOptions.Time),
      messages: remindMessageList.map((messageItem) => {
        return messageItem.message;
      }),
    };

    createNewPlanAPI(data);
  };

  return (
    <div className={classNames('create-page')}>
      <WritablePlan
        isEditPage={false}
        isPublic={isPublic}
        onToggleIsPublic={toggleIsPublic}
        title={title}
        description={description}
        onChangeTitle={setTitle}
        onChangeDescription={setDescription}
        tags={tags}
        changeTags={setTags}
      />
      <WritableRemind
        isEditPage={false}
        remindOption={remindOptions}
        setRemindOption={handleChangeRemindOption}
        fixRemindOptions={fixRemindOptions}
        remindMessageList={remindMessageList}
        setRemindMessage={handleChangeRemindMessage}
        makeAllRemindMessageSame={makeAllRemindMessageSame}
        classNameList={['create-page__remind']}
      />
      <div className={classNames('create-page__button__container')}>
        <Link href="/home">
          <Button
            background={isCreatePossible ? 'primary' : 'gray-200'}
            color="white-100"
            size="lg"
            border={false}
            onClick={() => {
              handleCreateNewPlan();
            }}
            disabled={!isCreatePossible}>
            작성 완료
          </Button>
        </Link>
        <Button
          background="primary"
          color="white-100"
          size="lg"
          border={false}
          onClick={() => {
            setIsExitModalOpen(true);
          }}>
          나가기
        </Button>
      </div>

      {isExitModalOpen && (
        <Modal>
          <ModalExit
            exitLink="/home"
            closeModal={() => {
              setIsExitModalOpen(false);
            }}>
            작성 중인 계획이 있습니다. 정말 페이지를 나가시겠습니까 ?
          </ModalExit>
        </Modal>
      )}
    </div>
  );
}
