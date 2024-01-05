import axios, {AxiosInstance} from 'axios';
import {RequestInterceptor, ResponseInterceptor} from './interceptors.ts';

export const createAPI = (): AxiosInstance => {
  const axiousInstance = axios.create({
    baseURL: 'https://13.design.pages.academy/wtw',
    timeout: 5000,
  });

  axiousInstance.interceptors.request.use(RequestInterceptor);

  axiousInstance.interceptors.response.use((response) => response, ResponseInterceptor);

  return axiousInstance;
};
