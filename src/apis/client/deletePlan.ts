import { axiosInstanceClient } from '../axiosInstanceClient';

// 헤더에 date 추가해줘야 함
export const deletePlan = (planId: number) => {
  return axiosInstanceClient.delete(`/plans/${planId}`);
};
