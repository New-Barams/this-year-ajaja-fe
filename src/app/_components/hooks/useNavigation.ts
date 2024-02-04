import { getMyPlans } from '@/apis/client/getMyPlans';
import { ajajaToast } from '@/components/Toaster/customToast';
import { maxPlan } from '@/constants/plan';
import { canMakeNewPlanStore } from '@/stores/canMakeNewPlanStore';
import { isMyPlanStore } from '@/stores/isMyPlanStore';
import { checkIsSeason } from '@/utils/checkIsSeason';
import { checkThisYear } from '@/utils/checkThisYear';
import { hasCookie } from 'cookies-next';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function useNavigation({ hasAuth }: { hasAuth: boolean }) {
  const pathName = usePathname();
  const [isLogin, setIsLogin] = useState(hasAuth);
  const [canMakeNewPlan, setCanMakeNewPlan] =
    useRecoilState(canMakeNewPlanStore);
  const [isMyPlan] = useRecoilState(isMyPlanStore);
  const isRealLogin = () => {
    if (!hasCookie('auth')) {
      setTimeout(() => {
        setIsLogin(hasCookie('auth'));
      }, 1000);
    }
  };
  const handleCreate = () => {
    if (!canMakeNewPlan) {
      ajajaToast.error('생성할 수 있는 계획의 수가 최대입니다.');
    } else if (!checkIsSeason()) {
      ajajaToast.error('계획을 작성할 수 있는 시즌이 아닙니다.');
    }
  };

  useEffect(() => {
    async function isMaxPlan() {
      const data = await getMyPlans();
      if (data.data[0]?.year === checkThisYear()) {
        setCanMakeNewPlan(!!(maxPlan - data.data[0].getPlanList.length));
      }
    }

    isMaxPlan();
  }, [setCanMakeNewPlan]);

  return {
    pathName,
    isLogin,
    setIsLogin,
    canMakeNewPlan,
    isMyPlan,
    isRealLogin,
    handleCreate,
  };
}
