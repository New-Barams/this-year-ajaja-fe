import { DOMAIN } from '@/constants/api';
import { axiosInstanceClient } from '../axiosInstanceClient';

interface PostRemindTestResponse {
  success: boolean;
  data: 'EMAIL' | 'KAKAO' | 'BOTH';
}

export const postRemindTest = async () => {
  const { data } = await axiosInstanceClient.post<PostRemindTestResponse>(
    DOMAIN.POST_REMINDS_TEST,
  );
  return data;
};
