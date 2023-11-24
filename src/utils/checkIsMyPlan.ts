import { getCookie } from 'cookies-next';
import { getUserIdFromJWT } from './getUserIdFromJWT';

interface Auth {
  accessToken: string;
  refreshToken: string;
}

export const checkIsMyPlan = (planUserId: number) => {
  const auth = getCookie('auth');

  if (auth !== undefined) {
    const authObject = JSON.parse(auth) as Auth; // 쿠키에 있는 auth의 값이 있으면 Auth 타입일 것임
    const currentUserId = getUserIdFromJWT(authObject.accessToken);

    return planUserId === currentUserId;
  }

  return false;
};
