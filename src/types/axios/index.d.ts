import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    authorization?: boolean;
  }
}
