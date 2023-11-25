export interface PostReissueResponse {
  success: boolean;
  data: Token;
}

export type Token = {
  accessToken: string;
  refreshToken: string;
};
