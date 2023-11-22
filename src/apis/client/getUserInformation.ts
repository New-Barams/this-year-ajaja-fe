import { GetUserInformationResponse } from '@/types/apis/users/GetUserInformation';
import { axiosInstanceClient } from '@apis/axiosInstanceClient';
import { DOMAIN } from '@constants/api';

export const getUserInformation = async () => {
  const { data } = await axiosInstanceClient<GetUserInformationResponse>(
    DOMAIN.GET_USERS,
  );
  return data;
};
