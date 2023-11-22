import { DOMAIN } from '@/constants/api';
import { RemindData } from '@/types/components/Remind';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const getRemindSeason = async (planId: number): Promise<RemindData> => {
  const { data } = await axiosInstanceClient.get(
    DOMAIN.GET_REMINDS_MODIFY(planId),
  );

  return data;
};
