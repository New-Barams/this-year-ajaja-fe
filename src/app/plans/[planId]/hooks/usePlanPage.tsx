import { ReadOnlyPlan } from '@/components';
import { ajajaToast } from '@/components/Toaster/customToast';
import { useDeletePlanMutation } from '@/hooks/apis/useDeletePlanMutation';
import { useGetPlanQuery } from '@/hooks/apis/useGetPlanQuery';
import { useIsLogIn } from '@/hooks/useIsLogIn';
import { isMyPlanStore } from '@/stores/isMyPlanStore';
import { checkIsSeason } from '@/utils/checkIsSeason';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import NotPublic from '../_components/NotPublic/NotPublic';
import SearchingPlan from '../_components/SearchingPlan/SearchingPlan';

export default function usePlanPage(planId: string) {
  const router = useRouter();
  const isSeason = checkIsSeason();
  const { isLogin } = useIsLogIn();
  const [isClientSide, setIsClientSide] = useState(false);
  const { plan, isPending } = useGetPlanQuery(Number(planId), isLogin);
  const [currentURL, setCurrentURL] = useState<string>('');
  const [isDeletePlanModalOpen, setIsDeletePlanModalOpen] = useState(false);
  const { mutate: deletePlanAPI } = useDeletePlanMutation();
  const setIsMyPlanStore = useSetRecoilState(isMyPlanStore);
  const isMyPlan = plan.writer.owner;
  const isSearching = !isClientSide || isPending;
  const isAccessible = isMyPlan || plan.public;
  const isEditable = isMyPlan && isSeason;

  useEffect(() => {
    if (typeof window !== 'undefined') setIsClientSide(true);
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
  //TODO 컴포넌트 반환 함수 변경 필요
  // 서버사이드, pending중이면 <SearchingPlan/>
  // 내 계획이아니고 비공개이면 <NotPublic/>
  // 나머지

  const createPageContent = () => {
    if (isSearching) {
      return <SearchingPlan />;
    } else if (!isAccessible) {
      return <NotPublic />;
    } else {
      return (
        <ReadOnlyPlan isMine={isMyPlan} planData={{ ...plan }}>
          {isEditable && (
            <div className="plan__header--buttons">
              <Link href={`/plans/edit/${planId}`}>수정</Link>|
              <span onClick={handleOpenDeleteModal}>삭제</span>
            </div>
          )}
        </ReadOnlyPlan>
      );
    }

    // if (isClientSide) {
    //   if (isAccessible) {
    //     return (
    //       <ReadOnlyPlan isMine={isMyPlan} planData={{ ...plan }}>
    //         {isEditable && (
    //           <div className="plan__header--buttons">
    //             <Link href={`/plans/edit/${planId}`}>수정</Link>|
    //             <span onClick={handleOpenDeleteModal}>삭제</span>
    //           </div>
    //         )}
    //       </ReadOnlyPlan>
    //     );
    //   } else {
    //     return <NotPublic />;
    //   }
    // } else {
    //   return <SearchingPlan />;
    // }
  };
  const pageContent = createPageContent();
  return {
    planId,
    isClientSide,
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
