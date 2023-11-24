import { DOMAIN } from '@/constants/api';
import { axiosInstanceClient } from './../axiosInstanceClient';

export const deleteUsers = () => {
  return axiosInstanceClient.delete(DOMAIN.DELETE_USERS);
};
