export interface GetUserInformationResponse {
  success: boolean;
  data: User;
}
interface User {
  nickname: string;
  defaultEmail: string;
  remindEmail: string;
  emailVerified: boolean;
  receiveType: ReceiveType;
}

export type ReceiveType = 'both' | 'email' | 'kakao';
