import { axiosInstance } from '@/apis/axiosInstance';
import { GetMyPlansResponse } from '@/types/apis/plan/GetMyPlans';
import { useQuery } from '@tanstack/react-query';

export const getMyPlans = async (userId: string) => {
  const { data } = await axiosInstance.get<GetMyPlansResponse>(
    `/plans/main/${userId}`,
  );
  return data;
};

export const useMyPlansQuery = async (userId: string) => {
  const { data } = useQuery({
    queryKey: ['todos'],
    queryFn: () => getMyPlans(userId),
  });
  return data;
};
