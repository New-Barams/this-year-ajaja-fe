import { useGetMyPlansQuery } from '@/hooks/apis/useGetMyPlansQuery';
import { checkThisYear } from '@/utils/checkThisYear';

export default function useHomePage() {
  const { myPlans } = useGetMyPlansQuery();

  if (!myPlans.data.length || myPlans.data[0].year !== checkThisYear()) {
    myPlans.data.unshift({
      year: checkThisYear(),
      totalAchieveRate: 0,
      getPlanList: [],
    });
  }
  return { myPlans };
}
