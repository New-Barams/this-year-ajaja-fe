import { NETWORK } from '@/constants/api';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TEST_API_END_POINT,
  timeout: NETWORK.TIMEOUT,
  authorization: true,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (
      !config.authorization ||
      !config.headers ||
      config.headers.Authorization
    )
      return config;

    const auth = cookies().get('auth');

    if (!auth) {
      throw new Error('토큰이 존재하지 않습니다');
    }

    config.headers.Authorization = `Bearer ${
      JSON.parse(auth?.value).accessToken
    }`;
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);