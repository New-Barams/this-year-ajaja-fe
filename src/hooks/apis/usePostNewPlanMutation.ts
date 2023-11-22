import { postNewPlan } from '@/apis/client/postNewPlan';
import { useMutation } from '@tanstack/react-query';

export const usePostNewPlanMutation = () => {
  return useMutation({
    mutationFn: postNewPlan,
  });
};
