'use client';

import { SESSION_STORAGE_KEY } from '@/constants';
import { PlanContentType } from '@/types/Plan';
import { useEffect, useRef } from 'react';
import { IconSwitchButton, InputTag, PlanInput, Tag } from '..';
import { useSessionStorage } from './../../hooks/useSessionStorage';

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
    <div>
      <PlanInput
        editable={true}
        kind="title"
        placeholder="어떤 계획을 가지고 계신가요?"
        onChangeInput={handleChangeTitle}
        maxLength={20}
        textInput={planContent.title}
        nextTextAreaRef={nextTextAreaRef}
      />

      <PlanInput
        editable={true}
        kind="content"
        placeholder="계획에 대해서 자세히 설명해주세요!"
        onChangeInput={handleChangeDescription}
        maxLength={250}
        textInput={planContent.description}
        nextTextAreaRef={nextTextAreaRef}
      />

      <div>
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

      <div>다른 사람들이 내 계획을 볼 수 있도록 할까요?</div>
      <IconSwitchButton
        onIconName="PLAN_OPEN"
        offIconName="PLAN_CLOSE"
        isActive={planContent.isPublic}
        onClick={() => {
          handleChangeIsPublic(!planContent.isPublic);
        }}
      />
      <span> {planContent.isPublic ? '계획 공개' : '계획 비공개'}</span>

      <div>
        매주 몇 명의 사람이 내 계획을 응원하는 지 알림을 받고 싶으신가요?
      </div>
      <IconSwitchButton
        onIconName="NOTIFICATION_ON"
        offIconName="NOTIFICATION_OFF"
        isActive={planContent.canAjaja}
        onClick={() => {
          handleChangeCanAjaja(!planContent.canAjaja);
        }}
      />
      <span>
        {planContent.canAjaja ? '응원 메세지 활성화' : '응원 메세지 비활성화'}
      </span>
    </div>
  );
}
