import { useGetFeedbacksQuery } from '@/hooks/apis/useGetFeedbacksQuery';

export default function usePlanIdPage({
  params,
}: {
  params: { planId: string };
}) {
  const { planId } = params;
  const { feedback } = useGetFeedbacksQuery(parseInt(planId, 10));
  const { achieveRate, title, feedbacks } = feedback;
  let plan_evaluate_text = '';

  if (achieveRate >= 80) {
    plan_evaluate_text = '매우 잘 지키고 있어요!';
  } else if (achieveRate >= 50) {
    plan_evaluate_text = '잘 지키고 있어요!';
  } else {
    plan_evaluate_text = '잘 지켜주세요!';
  }
  return {
    planId,
    feedback,
    achieveRate,
    title,
    feedbacks,
    plan_evaluate_text,
  };
}
