import { editPlan } from '@/apis/client/editPlan';
import { useMutation } from '@tanstack/react-query';

export const useEditPlanMutation = () => {
  return useMutation({
    mutationFn: editPlan,
  });
};
