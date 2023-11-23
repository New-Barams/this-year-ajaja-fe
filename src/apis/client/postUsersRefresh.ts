import { PostUsersRefreshResponse } from '@/types/apis/users/PostUsersRefresh';
import { axiosInstanceClient } from '@apis/axiosInstanceClient';
import { DOMAIN } from '@constants/api';

export const postUsersRefresh = () => {
  return axiosInstanceClient.post<PostUsersRefreshResponse>(
    DOMAIN.POST_USERS_REFRESH,
  );
};
