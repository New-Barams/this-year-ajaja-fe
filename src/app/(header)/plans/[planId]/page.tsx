'use client';

import { Button, ReadOnlyRemind } from '@/components';
import { checkIsSeason } from '@/utils/checkIsSeason';
import classNames from 'classnames';
import Link from 'next/link';
import './index.scss';

export default function PlanIdPage({ params }: { params: { planId: string } }) {
  // 계획 단건 조회로 계획 데이터 받아와 계획 컴포넌트 렌러링
  // 계획 data안 userId와 현재 유저의 userId 비교해서 내 계획인지 여부인 isMyPlan 값 할당
  const { planId } = params;
  const isMyPlan = true;
  const isSeason = checkIsSeason();

  const deletePlan = (planId: string) => {
    console.log(`${planId}에 해당하는 계획 삭제 API 호출 `);
  };

  return (
    <div className={classNames('plans-page')}>
      {isMyPlan && <ReadOnlyRemind planId={planId} />}

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
              deletePlan(planId);
            }}>
            삭제
          </Button>
        </div>
      )}
    </div>
  );
}
