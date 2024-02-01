'use client';

import { INPUT_MAX_LENGTH, SESSION_STORAGE_KEY } from '@/constants';
import { PlanContentType } from '@/types/Plan';
import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import { DeletableTag, IconSwitchButton, PlanInput, TagInput } from '..';
import HelpButton from '../HelpButton/HelpButton';
import { useSessionStorage } from './../../hooks/useSessionStorage';
import './index.scss';

interface CreatePlanContentProps {
  setIsSecondStepDataAllExist: (isExist: boolean) => void;
}

export default function CreatePlanContent({
  setIsSecondStepDataAllExist,
}: CreatePlanContentProps) {
  const [planContent, setPlanContent] = useSessionStorage<PlanContentType>({
    key: SESSION_STORAGE_KEY.STEP_2,
    initialValue: {
      title: '',
      description: '',
      tags: [],
      isPublic: true,
      canAjaja: true,
    },
  });

  // state가 바뀔 때마다 다음 단계로 갈 수 있는지 여부를 변경해주는 useEffect 훅
  useEffect(() => {
    if (planContent.title.length > 0 && planContent.description.length > 0) {
      setIsSecondStepDataAllExist(true);
    } else {
      setIsSecondStepDataAllExist(false);
    }
  }, [planContent, setIsSecondStepDataAllExist]);

  const nextTextAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleChangeTitle = (newTitle: string) => {
    setPlanContent({ ...planContent, title: newTitle });
  };

  const handleChangeDescription = (newDescription: string) => {
    setPlanContent({
      ...planContent,
      description: newDescription,
    });
  };

  const handleChangeTags = (newTags: string[]) => {
    setPlanContent({ ...planContent, tags: newTags });
  };

  const handleRemoveTag = (removedTag: string) => {
    const filteredTags = planContent.tags.filter((tag) => tag !== removedTag);
    handleChangeTags(filteredTags);
  };

  const handleAddTag = (text: string) => {
    const trimedTags = text.trim();
    if (
      planContent.tags.includes(trimedTags) ||
      planContent.tags.length >= 5 ||
      trimedTags.length === 0
    ) {
      return;
    }
    const newTagList = [...planContent.tags, trimedTags];
    handleChangeTags(newTagList);
  };

  const handleChangeIsPublic = (newIsPublic: boolean) => {
    setPlanContent({ ...planContent, isPublic: newIsPublic });
  };

  const handleChangeCanAjaja = (newCanAjaja: boolean) => {
    setPlanContent({ ...planContent, canAjaja: newCanAjaja });
  };

  return (
    <div className={classNames('create-plan-content')}>
      <PlanInput
        editable={true}
        kind="title"
        placeholder="어떤 계획을 가지고 계신가요?"
        onChangeInput={handleChangeTitle}
        maxLength={INPUT_MAX_LENGTH.PLAN_TITLE}
        textInput={planContent.title}
        nextTextAreaRef={nextTextAreaRef}
        classNameList={['create-plan-content__plan-input__first']}
      />

      <PlanInput
        editable={true}
        kind="content"
        placeholder="계획에 대해서 자세히 설명해주세요!"
        onChangeInput={handleChangeDescription}
        maxLength={INPUT_MAX_LENGTH.PLAN_DESCRIPTION}
        textInput={planContent.description}
        nextTextAreaRef={nextTextAreaRef}
        classNameList={['create-plan-content__plan-input__second']}
      />

      <div className={classNames('create-plan-content__tag')}>
        <div className="create-plan-content__tag--input">
          <TagInput
            disabled={planContent.tags.length === 5}
            onSubmit={handleAddTag}
            placeholder="태그를 입력해주세요"
          />
          <span
            className={classNames(
              'counter',
              'font-size-xs',
              planContent.tags.length === 5 && 'color-origin-primary',
            )}>{`(${planContent.tags.length}/5)`}</span>
        </div>
        <div className="create-plan-content__tag--tags">
          {planContent.tags.map((tag, index) => (
            <DeletableTag
              key={index}
              onClick={() => {
                handleRemoveTag(tag);
              }}>
              {tag}
            </DeletableTag>
          ))}
        </div>
      </div>

      <div className={classNames('create-plan-content__public')}>
        <div
          className={classNames(
            'create-plan-content__public__title',
            'font-size-sm',
          )}>
          다른 사람들이 내 계획을 볼 수 있도록 할까요?
        </div>
        <div className={classNames('create-plan-content__public__button')}>
          <IconSwitchButton
            onIconName="PLAN_OPEN"
            offIconName="PLAN_CLOSE"
            isActive={planContent.isPublic}
            onClick={() => {
              handleChangeIsPublic(!planContent.isPublic);
            }}
          />
          <span
            className={classNames(
              'create-plan-content__public__button-text',
              'font-size-xs',
            )}>
            {planContent.isPublic ? '계획 공개' : '계획 비공개'}
          </span>
        </div>
      </div>

      <div className={classNames('create-plan-content__ajaja')}>
        <div
          className={classNames(
            'create-plan-content__ajaja__title',
            'font-size-sm',
          )}>
          매주 몇 명의 사람이 내 계획을 응원하는 지 알림을 받고 싶으신가요?
        </div>

        <div className={classNames('create-plan-content__ajaja__button')}>
          <IconSwitchButton
            onIconName="NOTIFICATION_ON"
            offIconName="NOTIFICATION_OFF"
            isActive={planContent.canAjaja}
            onClick={() => {
              handleChangeCanAjaja(!planContent.canAjaja);
            }}
          />
          <span
            className={classNames(
              'create-plan-content__ajaja__button-text',
              'font-size-xs',
            )}>
            {planContent.canAjaja
              ? '매주 월요일 18:00시 마다 응원 메세지 알림 활성화'
              : '응원 메세지 알림 비활성화'}
          </span>
          <HelpButton
            textPosition="top-left"
            helpText={`매주 몇 명의 새로운 사람들이 내 계획에\n아좌좌를 눌러 응원했는지 알려드려요.`}
          />
        </div>
      </div>
    </div>
  );
}
