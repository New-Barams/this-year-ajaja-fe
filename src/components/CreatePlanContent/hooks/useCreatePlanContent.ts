import { SESSION_STORAGE_KEY } from '@/constants';
import { useSessionStorage } from '@/hooks';
import { PlanContentType } from '@/types';
import { useEffect, useRef } from 'react';

interface useCreatePlanContentProps {
  setIsSecondStepDataAllExist: (isExist: boolean) => void;
}

export default function useCreatePlanContent({
  setIsSecondStepDataAllExist,
}: useCreatePlanContentProps) {
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

  return {
    planContent,
    nextTextAreaRef,
    handleChangeTitle,
    handleChangeDescription,
    handleRemoveTag,
    handleAddTag,
    handleChangeIsPublic,
    handleChangeCanAjaja,
  };
}
