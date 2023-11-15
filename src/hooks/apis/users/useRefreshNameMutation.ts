import { axiosInstance } from '@/apis/axiosInstance';

export const useRefreshNameMutation = async () => {
  try {
    const { data } = await axiosInstance.post('/mock/users/refresh');
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
