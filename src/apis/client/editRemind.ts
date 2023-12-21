import { DOMAIN } from '@/constants/api';
import { EditRemindProps } from '@/types/apis/plan/EditRemind';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const editRemind = async ({ planId, remindData }: EditRemindProps) => {
  const { data } = await axiosInstanceClient.put(DOMAIN.PUT_REMINDS(planId), {
    ...remindData,
  });
  return data;
};
