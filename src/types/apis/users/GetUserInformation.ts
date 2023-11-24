export interface GetUserInformationResponse {
  success: boolean;
  data: User;
}
interface User {
  nickname: string;
  defaultEmail: string;
  remindEmail: string;
  isEmailVerified: boolean;
  receiveType: ReceiveType;
}

type ReceiveType = 'both' | 'email' | 'kakao';
