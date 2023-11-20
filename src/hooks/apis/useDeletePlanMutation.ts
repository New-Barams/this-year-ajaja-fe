import { deletePlan } from '@/apis/client/deletePlan';
import { useMutation } from '@tanstack/react-query';

export const useDeletePlanMutation = () => {
  return useMutation({
    mutationFn: deletePlan,
  });
};
