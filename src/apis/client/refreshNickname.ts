import { RefreshNicknameResponse } from '@/types/apis/users/RefreshNickname';
import { axiosInstanceClient } from '@apis/axiosInstanceClient';
import { DOMAIN } from '@constants/api';

export const refreshNickname = () => {
  return axiosInstanceClient.post<RefreshNicknameResponse>(
    DOMAIN.POST_USERS_REFRESH,
  );
};
