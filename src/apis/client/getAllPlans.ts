import { axiosInstanceClient } from '../axiosInstanceClient';

export const getAllPlans = async () => {
  try {
    const { data } = await axiosInstanceClient.get('/plans', {
      authorization: false,
    });
    return data;
  } catch (error) {
    console.log('Error:', error);
  }
};
