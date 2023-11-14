import { axiosInstance } from '@/apis/axiosInstance';

export const useAllPlansQuery = async () => {
  try {
    const { data } = await axiosInstance.get('/mock/plans', {
      authorization: false,
    });
    // console.log(data);
    return data;
  } catch (error) {
    console.log('Error:', error);
  }
};
