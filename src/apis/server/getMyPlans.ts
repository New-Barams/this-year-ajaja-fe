import { GetMyPlansResponse } from '@/types/apis/plan/GetMyPlans';
import { axiosInstanceServer } from '@apis/axiosInstanceServer';

export const getMyPlans = async (userId: string) => {
  try {
    const { data } = await axiosInstanceServer.get<GetMyPlansResponse>(
      `/plans/main/${userId}`,
    );
    return data;
  } catch (error) {
    console.log('Error:', error);
  }
};
