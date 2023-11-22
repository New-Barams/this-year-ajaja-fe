import { DOMAIN } from '@/constants/api';
import { editPlanProps } from '@/types/apis/plan/EditPlan';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const editPlan = async ({ planId, planData }: editPlanProps) => {
  const { data } = await axiosInstanceClient.put(
    DOMAIN.PUT_PLANS(planId),
    { ...planData },
    {
      headers: { Month: 1 }, // TODO: Month: currentMonth()로 바꿔줘야 함
    },
  );
  return data;
};
