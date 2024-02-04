import { canMakeNewPlanStore } from '@/stores/canMakeNewPlanStore';
import { useRecoilState } from 'recoil';

export const useNewPlan = () => {
  const [canMakeNewPlan] = useRecoilState(canMakeNewPlanStore);

  return { canMakeNewPlan };
};
