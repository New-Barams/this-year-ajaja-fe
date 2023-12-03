export const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}?way=login&response_type=code`;
export const UN_AUTH_URL = '/explore';
export const KAKAO_LOGOUT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&logout_redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}?way=logout`;
