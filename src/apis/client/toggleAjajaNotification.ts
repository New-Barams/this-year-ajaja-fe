import { axiosInstanceClient } from '../axiosInstanceClient';

export const toggleAjajaNotification = (planId: number) => {
  return axiosInstanceClient.put(`/plans/${planId}/ajaja`);
};
