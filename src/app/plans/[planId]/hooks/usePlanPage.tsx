import { ReadOnlyPlan } from '@/components';
import { ajajaToast } from '@/components/Toaster/customToast';
import { useDeletePlanMutation } from '@/hooks/apis/useDeletePlanMutation';
import { useGetPlanQuery } from '@/hooks/apis/useGetPlanQuery';
import { useIsLogIn } from '@/hooks/useIsLogIn';
import { isMyPlanStore } from '@/stores/isMyPlanStore';
import { checkIsSeason } from '@/utils/checkIsSeason';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import NotPublic from '../_components/NotPublic/NotPublic';
import SearchingPlan from '../_components/SearchingPlan/SearchingPlan';

export default function usePlanPage(planId: string) {
  const { isLogin } = useIsLogIn();
  const router = useRouter();
  const isSeason = checkIsSeason();
  const { plan } = useGetPlanQuery(Number(planId), isLogin);

  const [currentURL, setCurrentURL] = useState<string>('');

  const [isDeletePlanModalOpen, setIsDeletePlanModalOpen] = useState(false);
  //ref로 변경, 서버사이드가 작동되지 않도록 막기

  const { mutate: deletePlanAPI } = useDeletePlanMutation();
  const setIsMyPlanStore = useSetRecoilState(isMyPlanStore);
  const isMyPlan = plan.writer.owner;

  const isClientSide = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') isClientSide.current = true;
    return () => {
      isClientSide.current = false;
    };
  }, []);

  //이 useEffect는 합칠 수 있지 않을까?

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

  const pageContent = createPageContent();
  return {
    planId,
    isMyPlan,
    currentURL,
    isDeletePlanModalOpen,
    pageContent,
    handleCopyLink,
    handleModalClickNo,
    handleModalClickYes,
    handleOpenDeleteModal,
  };
}
