const REDIRECT_URI = `http://localhost:3000/oauth`;
export const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
export const UNLOGIN_URL = '/explore';
