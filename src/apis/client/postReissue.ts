import { auth } from '@/stores/authStore';
import { axiosInstanceClient } from '@apis/axiosInstanceClient';
import { DOMAIN } from '@constants/api';

export const postReissue = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  const requestBody: PostReissueRequestBody = { accessToken, refreshToken };
  return axiosInstanceClient.post<PostReissueResponse>(
    DOMAIN.POST_REISSUE,
    requestBody,
    {
      authorization: false,
    },
  );
};

interface PostReissueRequestBody {
  accessToken: string;
  refreshToken: string;
}

interface PostReissueResponse {
  success: boolean;
  data: auth;
}
