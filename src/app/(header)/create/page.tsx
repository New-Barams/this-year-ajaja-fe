'use client';

import { Button, Modal, WritableRemind } from '@/components';
import ModalExit from '@/components/Modal/ModalExit';
import { ajajaToast } from '@/components/Toaster/customToast';
import WritablePlan from '@/components/WritablePlan/WritablePlan';
import { usePostNewPlanMutation } from '@/hooks/apis/usePostNewPlanMutation';
import { RemindItemType, RemindOptionType } from '@/types/Remind';
import { PostNewPlanRequestBody } from '@/types/apis/plan/PostNewPlan';
import { changeRemindTimeToString } from '@/utils/changeRemindTimeToString';
import { decideRandomIconNumber } from '@/utils/decideRandomIconNumber';
import { decideRemindDate } from '@/utils/decideRemindDate';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import './index.scss';

export default function CreatePage() {
  const router = useRouter();
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
    setRemindMessageList((prevRemindMessageList) => {
      return prevRemindMessageList.map((item) => {
        if (item.date.month === month && item.date.day === day) {
          return { ...item, message: newMessage };
        }
        return item;
      });
    });
  };

  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

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
    setRemindMessageList((prevList) => {
      if (prevList.length > 1) {
        const firstMessage = prevList[0].message;
        return prevList.map((item) => ({ ...item, message: firstMessage }));
      }
      return prevList;
    });
  }, []);

  const isAllRemindMessageExists =
    remindMessageList.length > 0 &&
    remindMessageList.every((remindItem) => remindItem.message.length > 0);

  const isCreatePossible =
    isAllRemindMessageExists && title.length !== 0 && description.length !== 0;

  const { mutate: createNewPlanAPI } = usePostNewPlanMutation();

  const handleClickCreateButton = () => {
    if (isCreatePossible) {
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

      router.push('/home');
    } else {
      ajajaToast.error('모든 항목을 입력해주세요 !');
    }
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
        <Button
          background={isCreatePossible ? 'primary' : 'gray-200'}
          color="white-100"
          size="lg"
          border={false}
          onClick={() => {
            handleClickCreateButton();
          }}>
          작성 완료
        </Button>
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
