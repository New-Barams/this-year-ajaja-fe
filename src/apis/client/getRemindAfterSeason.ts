import { axiosInstanceClient } from '../axiosInstanceClient';

export const getRemindAfterSeason = (planId: number) => {
  return axiosInstanceClient.get(`/reminds/${planId}`);
};
