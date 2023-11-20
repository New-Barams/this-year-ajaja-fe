import { axiosInstanceClient } from '../axiosInstanceClient';

export const toggleIsPublic = (planId: number) => {
  return axiosInstanceClient.put(`/plans/${planId}/public`);
};
