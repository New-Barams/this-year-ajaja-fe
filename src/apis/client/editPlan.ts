import { DOMAIN } from '@/constants/api';
import { EditPlanData } from '@/types/apis/plan/EditPlan';
import { currentMonth } from '@/utils/currentMonth';
import { axiosInstanceClient } from '../axiosInstanceClient';

interface editPlanProps {
  planId: number;
  planData: EditPlanData;
}

export const editPlan = async ({ planId, planData }: editPlanProps) => {
  const { data } = await axiosInstanceClient.put(
    DOMAIN.PUT_PLANS(planId),
    { data: planData },
    {
      headers: { Month: currentMonth() },
    },
  );
  return data;
};
