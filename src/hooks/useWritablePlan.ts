import { EditPlanData } from '@/types/apis/plan/EditPlan';
import { PlanData } from '@/types/apis/plan/GetPlan';
import { useRef, useState } from 'react';

export const useWritablePlan = (planData: PlanData) => {
  const [planContent, setPlanContent] = useState<EditPlanData>({
    iconNumber: planData.icon,
    title: planData.title,
    description: planData.description,
    tags: planData.tags,
    isPublic: planData.public,
    canAjaja: planData.canAjaja,
  });
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
  const handleChangeIconNumber = (newIconNumber: number) => {
    setPlanContent({ ...planContent, iconNumber: newIconNumber });
  };

  return {
    nextTextAreaRef,
    planContent,
    handleChangeTitle,
    handleAddTag,
    handleChangeCanAjaja,
    handleChangeDescription,
    handleChangeIsPublic,
    handleChangeTags,
    handleRemoveTag,
    handleChangeIconNumber,
  };
};
