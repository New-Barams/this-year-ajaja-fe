'use client';

import {
  Button,
  Modal,
  ModalBasic,
  ReadOnlyPlan,
  ReadOnlyRemind,
} from '@/components';
import { PlanData } from '@/components/ReadOnlyPlan/ReadOnlyPlan';
import { checkIsSeason } from '@/utils/checkIsSeason';
import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
import './index.scss';

export default function PlanIdPage({ params }: { params: { planId: string } }) {
  // 계획 단건 조회로 계획 데이터 받아와 계획 컴포넌트 렌러링
  // TODO : 노철님이 구현하시면 리액트 쿼리 훅에서 받아오는 걸로 변경하기

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
  const isMyPlan = true; // 쿠키에 잇는 토큰을 decode해서 userId를 받아온 후, planData의 userId와 비교해야 함
  const isSeason = checkIsSeason();

  const [isDeletePlanModalOpen, setIsDeletePlanModalOpen] = useState(false);

  const handleModalClickYes = () => {
    setIsDeletePlanModalOpen(false);
    deletePlanAPI(planId);
  };

  const handleModalClickNo = () => {
    setIsDeletePlanModalOpen(false);
  };

  const deletePlanAPI = (planId: string) => {
    console.log(`${planId}에 해당하는 계획 삭제 API 호출 `);
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
