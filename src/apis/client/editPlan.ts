import { DOMAIN } from '@/constants/api';
import { editPlanProps } from '@/types/apis/plan/EditPlan';
import { currentMonth } from '@/utils/currentMonth';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const editPlan = async ({ planId, planData }: editPlanProps) => {
  const { data } = await axiosInstanceClient.put(
    DOMAIN.PUT_PLANS(planId),
    { ...planData },
    {
      headers: { Month: currentMonth() + 1 },
    },
  );
  return data;
};
