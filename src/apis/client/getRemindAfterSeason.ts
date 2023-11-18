import { axiosInstanceClient } from '../axiosInstanceClient';

export const getRemindAfterSeason = (planId: number) => {
  return axiosInstanceClient.get(`/plans/${planId}/reminds`); // url은 변경될 여지 있음
};
