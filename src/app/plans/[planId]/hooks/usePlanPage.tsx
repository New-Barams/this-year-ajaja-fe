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
  const { isLogin } = useIsLogIn();
  const router = useRouter();
  const isSeason = checkIsSeason();
  const [currentURL, setCurrentURL] = useState<string>('');
  const { plan } = useGetPlanQuery(Number(planId), isLogin);
  const [isDeletePlanModalOpen, setIsDeletePlanModalOpen] = useState(false);
  const [isClientSide, setIsClientSide] = useState<boolean>(false);

  const { mutate: deletePlanAPI } = useDeletePlanMutation();
  const setIsMyPlanStore = useSetRecoilState(isMyPlanStore);
  const isMyPlan = plan.writer.owner;

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
