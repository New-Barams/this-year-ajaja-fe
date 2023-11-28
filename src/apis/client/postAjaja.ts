import { DOMAIN } from '@/constants/api';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const postAjaja = async (planId: number) => {
  await axiosInstanceClient.post(DOMAIN.POST_AJAJA(planId));
};
