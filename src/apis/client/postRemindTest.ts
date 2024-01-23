import { DOMAIN } from '@/constants/api';
import { axiosInstanceClient } from '../axiosInstanceClient';

export const postRemindTest = async () => {
  const { data } = await axiosInstanceClient.post(DOMAIN.POST_REMINDS_TEST);
  return data;
};
