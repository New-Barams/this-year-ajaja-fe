'use client';

import { PlanContentType } from '@/types/Plan';
import { useEffect } from 'react';
import { useSessionStorage } from './../../hooks/useSessionStorage';

interface CreatePlanContentProps {
  setIsSecondStepDataAllExist: (isExist: boolean) => void;
}

export default function CreatePlanContent({
  setIsSecondStepDataAllExist,
}: CreatePlanContentProps) {
  const [planContent, setPlanContent] = useSessionStorage<PlanContentType>({
    key: 'createPlan-content',
    initialValue: {
      title: '',
      description: '',
      tags: [''],
      isPublic: true,
      canAjaja: true,
    },
  });

  useEffect(() => {
    if (
      planContent.title.length > 0 &&
      planContent.description.length > 0 &&
      planContent.tags.length > 0
    ) {
      setIsSecondStepDataAllExist(true);
    }
  }, [planContent, setIsSecondStepDataAllExist]);

  // TODO: WritablePlan 만들고 적용하기
  // const handleChangeTitle = (newTitle: string) => {
  //   setPlanContent({ ...planContent, title: newTitle });
  // };
  // // useSessionStorage를 통해 반환받은 setPlanContent는 useState의 setState처럼 (prev) 이렇게 가져올 수 없는 상황 ?

  // const handleChangeDescription = (newDescription: string) => {
  //   setPlanContent({
  //     ...planContent,
  //     description: newDescription,
  //   });
  // };

  // const handleChangeTags = (newTags: string[]) => {
  //   setPlanContent({ ...planContent, tags: newTags });
  // };

  // const handleChangeIsPublic = (newIsPublic: boolean) => {
  //   setPlanContent({ ...planContent, isPublic: newIsPublic });
  // };

  // const handleChangeCanAjaja = (newCanAjaja: boolean) => {
  //   setPlanContent({ ...planContent, canAjaja: newCanAjaja });
  // };

  const tempSetPlanContent = () => {
    setPlanContent({ ...planContent, title: '새로운 타이틀' });
  };

  const tempSetPlanContent2 = () => {
    setPlanContent({ ...planContent, description: '새로운 내용' });
  };

  return (
    <div>
      <div>계획 제목 : {planContent.title}</div>
      <div className="stepper" style={{ height: '2rem' }} />
      <div>계획 내용 : {planContent.description}</div>
      <div className="stepper" style={{ height: '2rem' }} />
      <div>태그 개수 : {planContent.tags.length}</div>
      <div className="stepper" style={{ height: '2rem' }} />
      <div>계획 공개 여부 : {planContent.isPublic ? '참' : '거짓'}</div>
      <div className="stepper" style={{ height: '2rem' }} />
      <div>아좌좌 알림 여부 : {planContent.canAjaja ? '참' : '거짓'}</div>
      <div className="stepper" style={{ height: '4rem' }} />
      <button onClick={tempSetPlanContent}>
        제목 변경 후 세션 스토리지 저장
      </button>

      <button onClick={tempSetPlanContent2}>
        내용 변경 후 세션 스토리지 저장
      </button>
    </div>
  );
}
