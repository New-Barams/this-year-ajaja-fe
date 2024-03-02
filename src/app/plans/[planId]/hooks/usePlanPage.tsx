import { ajajaToast } from '@/components/Toaster/customToast';
import { useDeletePlanMutation } from '@/hooks/apis/useDeletePlanMutation';
import { useGetPlanQuery } from '@/hooks/apis/useGetPlanQuery';
import { useIsLogIn } from '@/hooks/useIsLogIn';
import { isMyPlanStore } from '@/stores/isMyPlanStore';
import { checkIsSeason } from '@/utils/checkIsSeason';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

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

  return {
    plan,
    planId,
    isSearching,
    isAccessible,
    isEditable,
    isMyPlan,
    currentURL,
    isDeletePlanModalOpen,
    handleCopyLink,
    handleModalClickNo,
    handleModalClickYes,
    handleOpenDeleteModal,
  };
}
