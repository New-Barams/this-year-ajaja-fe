import { DOMAIN } from '@/constants/api';
import { ReceiveType } from '@/types/apis/users/GetUserInformation';
import { axiosInstanceClient } from '@apis/axiosInstanceClient';

export const putUserReceive = (receiveType: ReceiveType) => {
  const requestBody = { type: receiveType };
  return axiosInstanceClient.put(DOMAIN.PUT_USERS_RECEIVE, requestBody);
};
