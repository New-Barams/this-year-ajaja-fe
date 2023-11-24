'use client';

import {
  Button,
  Modal,
  ModalBasic,
  ReadOnlyPlan,
  ReadOnlyRemind,
} from '@/components';
import { useDeletePlanMutation } from '@/hooks/apis/useDeletePlanMutation';
import { useGetPlanQuery } from '@/hooks/apis/useGetPlanQuery';
import { checkIsMyPlan } from '@/utils/checkIsMyPlan';
import { checkIsSeason } from '@/utils/checkIsSeason';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import './index.scss';

export default function PlanIdPage({ params }: { params: { planId: string } }) {
  const { planId } = params;
  const router = useRouter();
  const isSeason = checkIsSeason();

  const { plan } = useGetPlanQuery(Number(planId));
  const isMyPlan = checkIsMyPlan(plan.userId);

  const [isDeletePlanModalOpen, setIsDeletePlanModalOpen] = useState(false);

  const { mutate: deletePlanAPI } = useDeletePlanMutation();

  const handleModalClickYes = () => {
    setIsDeletePlanModalOpen(false);
    deletePlanAPI(parseInt(planId, 10));
    router.replace('/home'); // TODO: 계획 삭제 했으니 상세 페이지 이전으로 1단계 이동하려고 back으로 했는데 일단 잘 안되서 /home으로 변경
  };

  const handleModalClickNo = () => {
    setIsDeletePlanModalOpen(false);
  };

  return (
    <div className={classNames('plans-page')}>
      <ReadOnlyPlan isMine={isMyPlan} planData={plan} />

      {isMyPlan && (
        <div className="plans-page__remind">
          <ReadOnlyRemind planId={planId} />
        </div>
      )}

      {isMyPlan && isSeason && (
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
