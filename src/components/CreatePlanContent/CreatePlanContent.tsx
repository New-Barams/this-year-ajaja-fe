'use client';

import { SESSION_STORAGE_KEY } from '@/constants';
import { useScroll } from '@/hooks/useScroll';
import { PlanContentType } from '@/types/Plan';
import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import { IconSwitchButton, InputTag, PlanInput, Tag } from '..';
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

  const { handleScroll, scrollableRef } = useScroll();

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
    if (planContent.tags.includes(trimedTags) || planContent.tags.length >= 5) {
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
    <div
      className={classNames('create-plan-content')}
      ref={scrollableRef}
      onScroll={handleScroll}>
      <PlanInput
        editable={true}
        kind="title"
        placeholder="어떤 계획을 가지고 계신가요?"
        onChangeInput={handleChangeTitle}
        maxLength={20}
        textInput={planContent.title}
        nextTextAreaRef={nextTextAreaRef}
        classNameList={['create-plan-content__plan-input__first']}
      />

      <PlanInput
        editable={true}
        kind="content"
        placeholder="계획에 대해서 자세히 설명해주세요!"
        onChangeInput={handleChangeDescription}
        maxLength={250}
        textInput={planContent.description}
        nextTextAreaRef={nextTextAreaRef}
        classNameList={['create-plan-content__plan-input__second']}
      />

      <div className={classNames('create-plan-content__tags')}>
        <InputTag onSubmit={handleAddTag} />
        {planContent.tags.map((tag, index) => (
          <Tag
            key={index}
            onClick={() => {
              handleRemoveTag(tag);
            }}>
            {tag}
          </Tag>
        ))}
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
        </div>
      </div>
    </div>
  );
}
