'use client';

import { NETWORK } from '@/constants/api';
import { ErrorResponseData } from '@/types/apis/ErrorResponseData';
import { checkTokenExp } from '@/utils/checkTokenExp';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import { postReissue } from '@apis/client/postReissue';

export const axiosInstanceClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: NETWORK.TIMEOUT,
  authorization: true,
});

axiosInstanceClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (
      !config.authorization ||
      !config.headers ||
      config.headers.Authorization
    )
      return config;

    const auth = getCookie('auth');

    if (!auth) {
      throw new Error('Client Component: 토큰이 존재하지 않습니다');
    }
    config.headers.Authorization = `Bearer ${JSON.parse(auth).accessToken}`;

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

axiosInstanceClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<ErrorResponseData>) => {
    //TODO:에러네임, 쿠키 키 상수화
    console.log('axios 에러 ');
    console.log(error);
    if (
      error.response &&
      error.response.data &&
      (error.response.data.errorName === 'INVALID_SIGNATURE' ||
        error.response.data.errorName === 'TOKEN_NOT_MATCH')
    ) {
      alertAndLogin();
    }

    if (
      error.response &&
      error.response.data &&
      error.response.data?.errorName === 'EXPIRED_TOKEN'
    ) {
      const auth = getCookie('auth');
      if (auth) {
        const accessToken = JSON.parse(auth).accessToken;
        const refreshToken = JSON.parse(auth).refreshToken;

        const isExpiredAccessToken = !checkTokenExp(accessToken);
        const isExpiredRefreshToken = !checkTokenExp(refreshToken);

        if (isExpiredAccessToken || isExpiredRefreshToken) {
          try {
            const {
              data: { data: tokens },
            } = await postReissue({
              accessToken,
              refreshToken,
            });
            setCookie('auth', tokens, { maxAge: 604800 });
            if (error.config) {
              error.config.headers.Authorization = `Bearer ${tokens.accessToken}`;
              const response = await axiosInstanceClient.request(error.config);
              return response;
            }
          } catch {
            alertAndLogin();
          }
        } else {
          alertAndLogin();
        }
      }
    }

    return Promise.reject(error);
  },
);

const alertAndLogin = () => {
  alert('로그인 정보가 유효하지 않습니다. 다시 로그인해주세요 ');
  window.location.replace(`${process.env.NEXT_PUBLIC_REDIRECT_URL}?way=logout`);
};
