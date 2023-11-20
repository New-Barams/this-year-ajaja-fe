import { postNewPlan } from '@/apis/client/postNewPlan';
import { useMutation } from '@tanstack/react-query';

export const usePostNewPlanMutation = () => {
  return useMutation({
    mutationFn: postNewPlan,
  });
};

// 사용 예시
// const { mutate: 쓰고싶은이름명, isLoading: 쓰고싶은이름명, } = usePostNewPlanMutation();
// onSuccess에 내 계획 정보 조  회 refetch 위해 invalidQueries?
