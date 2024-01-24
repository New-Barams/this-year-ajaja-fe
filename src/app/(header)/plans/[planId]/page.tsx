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
import NotPublic from './_components/NotPublic/NotPublic';
import SearchingPlan from './_components/SearchingPlan/SearchingPlan';
import './index.scss';

export default function PlanIdPage({ params }: { params: { planId: string } }) {
  const { isLogin } = useIsLogIn();
  const { planId } = params;
  const router = useRouter();
  const isSeason = checkIsSeason();
  const [currentURL, setCurrentURL] = useState<string>('');
  const { plan } = useGetPlanQuery(Number(planId), isLogin);
  const [isDeletePlanModalOpen, setIsDeletePlanModalOpen] = useState(false);
  const [isClientSide, setIsClientSide] = useState<boolean>(false);
  const { handleScroll, scrollableRef } = useScroll();
  const { mutate: deletePlanAPI } = useDeletePlanMutation();
  const setIsMyPlanStore = useSetRecoilState(isMyPlanStore);
  const isMyPlan = plan.writer.owner;

  // isVisible이라는 변수는 isMyPlan 과 plan.public값에 의해서 정해진다. 하지만 서버에서는 둘 다 undefined이다 그러면 값이 undefined으로 falsy하다.
  //그래서 초기html을 받으면 falsy한 html을 받느다.  서버와 클라이언트는 typeof window를 통해서 할 수 있다.
  // 또 문제가 이 부분으로 인해 notPublic한 계획도 초기 렌더링시 계획이 보이게된다. 그럼 한번 더싼다. typeof window를 확인해서
  //undefined면 isLoading
  useEffect(() => {
    if (typeof window !== 'undefined') setIsClientSide(true);
    return () => {
      setIsClientSide(false);
    };
  }, []);

  useEffect(() => {
    const current = window.location.href;
    setCurrentURL(current);
    setIsMyPlanStore(isMyPlan);
    return () => {
      setIsMyPlanStore(false);
    };
  }, [setIsMyPlanStore, isMyPlan]);

  const handleModalClickYes = () => {
    setIsDeletePlanModalOpen(false);
    deletePlanAPI(parseInt(planId, 10));
    router.push('/home');
  };
  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(currentURL);
    ajajaToast.success('링크가 복사되었습니다.');
  };

  const handleModalClickNo = () => {
    setIsDeletePlanModalOpen(false);
  };
  const handleOpenDeleteModal = () => {
    setIsDeletePlanModalOpen(true);
  };
  const createPageContent = () => {
    if (isClientSide) {
      if (isMyPlan || plan.public) {
        return (
          <ReadOnlyPlan isMine={isMyPlan} planData={{ ...plan }}>
            {isMyPlan && isSeason && (
              <div className="plan__header--buttons">
                <Link href={`/plans/edit/${planId}`}>수정</Link>|
                <span onClick={handleOpenDeleteModal}>삭제</span>
              </div>
            )}
          </ReadOnlyPlan>
        );
      } else {
        return <NotPublic />;
      }
    } else {
      return <SearchingPlan />;
    }
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
          <div className="plans-page__content">
            {createPageContent()}
            {isMyPlan && (
              <div className="plans-page--share">
                <h2>공유하기</h2>
                <div className="plans-page--share--buttons">
                  <label className="font-size-xs" onClick={handleCopyLink}>
                    <Icon name="COPY" color="text-100" size="md" />
                    링크 복사
                  </label>
                  <label className="font-size-xs">
                    <KakaoShareButton linkURL={currentURL} />
                    카카오톡
                  </label>
                </div>
              </div>
            )}
          </div>
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
              <Link href={`/feedback/${planId}`}>
                <Button
                  background="primary"
                  color="white-100"
                  size="lg"
                  border={false}>
                  피드백 보기
                </Button>
              </Link>
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
