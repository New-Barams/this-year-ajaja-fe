import { canMakeNewPlanStore } from '@/stores/canMakeNewPlanStore';
import { useRecoilState } from 'recoil';

export default function useNewPlan() {
  const [canMakeNewPlan] = useRecoilState(canMakeNewPlanStore);

  return { canMakeNewPlan };
}
