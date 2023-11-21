'use client';

import {
  Button,
  Modal,
  ModalBasic,
  ReadOnlyPlan,
  ReadOnlyRemind,
} from '@/components';
import { PlanData } from '@/components/ReadOnlyPlan/ReadOnlyPlan';
import { useDeletePlanMutation } from '@/hooks/apis/useDeletePlanMutation';
import { checkIsSeason } from '@/utils/checkIsSeason';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import './index.scss';

export default function PlanIdPage({ params }: { params: { planId: string } }) {
  const router = useRouter();
  // TODO: 계획 단건 조회 API 구현 후 리액트 쿼리 훅에서 받아오는 걸로 변경하기
  const planData: PlanData = {
    id: 2342342,
    userId: 2342342,
    nickname: '유저 닉네임',
    title: '계획 내용 테스트 ',
    description: '계획 설명',
    isPublic: true,
    tags: ['태그1', '태그2', '태그3', '태그4', '태그5'],
    ajajas: 32343,
    isAjajaOn: true,
    isCanAjaja: false,
    createdAt: '2023-06-15',
  };

  const { planId } = params;
  const isSeason = checkIsSeason();
  const isMyPlan = true; // TODO: 쿠키에 있는 토큰을 decode해서 userId를 받아온 후, planData의 userId와 비교해야 함

  const [isDeletePlanModalOpen, setIsDeletePlanModalOpen] = useState(false);

  const { mutate: deletePlanAPI } = useDeletePlanMutation();

  const handleModalClickYes = () => {
    setIsDeletePlanModalOpen(false);
    deletePlanAPI(parseInt(planId, 10));
    router.back(); // 계획 삭제 했으니 상세 페이지 이전으로 1단계 이동 시켜줘야 함
  };

  const handleModalClickNo = () => {
    setIsDeletePlanModalOpen(false);
  };

  return (
    <div className={classNames('plans-page')}>
      <ReadOnlyPlan isMine={isMyPlan} planData={planData} />

      {isMyPlan && (
        <div className="plans-page__remind">
          <ReadOnlyRemind planId={planId} />{' '}
        </div>
      )}

      {isMyPlan && !isSeason && (
        <div className={classNames('plans-page__button__container')}>
          <Link href={`/edit/${planId}`}>
            <Button
              background="white-100"
              color="primary"
              size="lg"
              border={true}>
              수정
            </Button>
          </Link>
          <Button
            background="primary"
            color="white-100"
            size="lg"
            border={false}
            onClick={() => {
              setIsDeletePlanModalOpen(true);
            }}>
            삭제
          </Button>
        </div>
      )}

      {isDeletePlanModalOpen && (
        <Modal>
          <ModalBasic
            onClickYes={handleModalClickYes}
            onClickNo={handleModalClickNo}>
            정말 해당 계획을 삭제하시겠습니까 ?
          </ModalBasic>
        </Modal>
      )}
    </div>
  );
}
