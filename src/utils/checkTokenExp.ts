import { decodeJWT } from './decodeJWT';

export const checkTokenExp = (token: string) => {
  const exp = decodeJWT(token).exp;
  const now = Date.now();

  return exp > now;
};
