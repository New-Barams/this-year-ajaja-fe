'use client';

import { ajajaToast } from '@/components/Toaster/customToast';
import { NETWORK } from '@/constants/api';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';

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
    if (
      error.response &&
      error.response.data &&
      error.response.data?.errorName === 'EXPIRED_TOKEN'
    ) {
      //TODO:에러는 error Name으로 확인,에러 상수화 ,  토큰 만료시 refresh토큰 만료시간 확인 후 가능하면reissue, 안되며 다식 로그인

      deleteCookie('auth');
      const redirectURL = `${process.env.NEXT_PUBLIC_REDIRECT_URL}`.replace(
        'oauth',
        'login',
      );
      ajajaToast.error('다시 로그인 해주세요');
      setTimeout(() => {
        window.location.replace(redirectURL);
      }, 2000);
    }

    return error;
  },
);

interface ErrorResponseData {
  errorName: string;
  errorMessage: string;
}
