import { axiosInstanceClient } from '../axiosInstanceClient';

export const toggleIsRemindable = (planId: number) => {
  return axiosInstanceClient.put(`/plans/${planId}/remindable`);
};
