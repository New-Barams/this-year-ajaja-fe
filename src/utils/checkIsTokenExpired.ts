import { decodeJWT } from './decodeJWT';

export const checkIsTokenExpired = (token: string) => {
  const exp = decodeJWT(token).exp;
  const now = Date.now();
  const nowLength = now.toString().length;
  const expStr = exp.toString().padEnd(nowLength, '0');

  return Number(expStr) < now;
};
