'use client';

import { Button, Icon, Modal, ModalBasic, ReadOnlyPlan } from '@/components';
import KakaoShareButton from '@/components/KakaoShareButton/KakaoShareButton';
import { ajajaToast } from '@/components/Toaster/customToast';
import { useDeletePlanMutation } from '@/hooks/apis/useDeletePlanMutation';
import { useGetPlanQuery } from '@/hooks/apis/useGetPlanQuery';
import { useIsLogIn } from '@/hooks/useIsLogIn';
import { useScroll } from '@/hooks/useScroll';
import { isMyPlanStore } from '@/stores/isMyPlanStore';
import { checkIsSeason } from '@/utils/checkIsSeason';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import './index.scss';

export default function PlanIdPage({ params }: { params: { planId: string } }) {
  const { isLogin } = useIsLogIn();
  const { planId } = params;
  const router = useRouter();
  const isSeason = checkIsSeason();
  const [current, setCurrent] = useState<string>('');
  const { plan } = useGetPlanQuery(Number(planId), isLogin);
  const [isDeletePlanModalOpen, setIsDeletePlanModalOpen] = useState(false);
  const { handleScroll, scrollableRef } = useScroll();
  const { mutate: deletePlanAPI } = useDeletePlanMutation();
  const setIsMyPlanStore = useSetRecoilState(isMyPlanStore);
  const isMyPlan = plan.writer.owner;
  const isVisible = isMyPlan || plan.public;

  useEffect(() => {
    if (!isVisible) {
      alert('비공개 페이지 입니다. 홈으로 이동하겠습니다.');
      router.replace('/home');
    }
    const currentURL = window.location.href;
    setCurrent(currentURL);
    setIsMyPlanStore(isMyPlan);
    return () => {
      setIsMyPlanStore(false);
    };
  }, [setIsMyPlanStore, isMyPlan, isVisible, router]);

  const handleModalClickYes = () => {
    setIsDeletePlanModalOpen(false);
    deletePlanAPI(parseInt(planId, 10));
    router.push('/home');
  };
  const handleCopyLink = async () => {
    console.log(current);
    await navigator.clipboard.writeText(current);

    ajajaToast.success('링크가 복사되었습니다.');
  };
  const handleModalClickNo = () => {
    setIsDeletePlanModalOpen(false);
  };
  const handleOpenDeleteModal = () => {
    setIsDeletePlanModalOpen(true);
  };

  return (
    <>
      <div
        className={classNames('plans-page')}
        ref={scrollableRef}
        onScroll={handleScroll}>
        <div className="plans-page__main">
          <div className="plans-page__breadcrumb font-size-base color-origin-text-100">
            {isMyPlan ? (
              <Link href="/home">홈</Link>
            ) : (
              <Link href="/explore">둘러보기</Link>
            )}
            &gt;
            <span>계획</span>
          </div>
          {isVisible && (
            <ReadOnlyPlan
              isLogin={isLogin}
              isMine={isMyPlan}
              planData={{ ...plan }}>
              {isMyPlan && isSeason && (
                <div className="plan__header--buttons">
                  <Link href={`/plans/edit/${planId}`}>수정</Link>|
                  <span onClick={handleOpenDeleteModal}>삭제</span>
                </div>
              )}
            </ReadOnlyPlan>
          )}
          {isMyPlan && (
            <div className="plans-page--share">
              <h2>공유하기</h2>
              <div className="plans-page--share--buttons">
                <label className="font-size-xs" onClick={handleCopyLink}>
                  <Icon name="COPY" color="text-100" size="md" />
                  링크 복사
                </label>
                <label className="font-size-xs">
                  <KakaoShareButton linkURL={current} />
                  카카오톡
                </label>
              </div>
            </div>
          )}
        </div>

        {isMyPlan && (
          <div className="plans-page__bottom">
            <div className={classNames('plans-page__bottom--buttons')}>
              <Link href={`/reminds/${planId}`}>
                <Button
                  background="primary"
                  color="white-100"
                  size="lg"
                  border={false}>
                  리마인드 보기
                </Button>
              </Link>

              <Button
                background="secondary"
                color="white-100"
                size="lg"
                border={false}>
                피드백 보기
              </Button>
            </div>
          </div>
        )}
      </div>
      {isDeletePlanModalOpen && (
        <Modal>
          <ModalBasic
            onClickYes={handleModalClickYes}
            onClickNo={handleModalClickNo}
            confirmSentense="삭제 하기">
            정말 해당 계획을 삭제하시겠습니까 ?
          </ModalBasic>
        </Modal>
      )}
    </>
  );
}
