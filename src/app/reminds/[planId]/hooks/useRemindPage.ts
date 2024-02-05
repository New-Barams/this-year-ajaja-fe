import { useGetRemindQuery, useToggleIsRemindableMutation } from '@/hooks/apis';
import { checkIsSeason } from '@/utils';
import { useRouter } from 'next/navigation';

export default function useRemindPage(planId: string) {
  const router = useRouter();
  const isSeason = checkIsSeason();

  const { remindData } = useGetRemindQuery(
    parseInt(planId, 10),
    checkIsSeason(),
  );

  const { mutate: toggleIsRemindableAPI } = useToggleIsRemindableMutation(
    parseInt(planId, 10),
  );

  const handleToggleIsRemindable = () => {
    toggleIsRemindableAPI(parseInt(planId, 10));
  };

  const onClickGoBackToPlanPage = () => {
    router.push(`/plans/${planId}`);
  };

  return {
    isSeason,
    remindData,
    handleToggleIsRemindable,
    onClickGoBackToPlanPage,
  };
}
