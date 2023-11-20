import { axiosInstanceClient } from '../axiosInstanceClient';

export const getRemindSeason = (planId: number) => {
  return axiosInstanceClient.get(`/reminds/modify/${planId}`);
};
