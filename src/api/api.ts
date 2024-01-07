import axios, {AxiosInstance} from 'axios';
import {RequestInterceptor, ResponseInterceptor} from './interceptors.ts';
import {BACKEND_URL, REQUEST_TIMEOUT} from '../const.ts';

export const createAPI = (): AxiosInstance => {
  const axiousInstance = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  axiousInstance.interceptors.request.use(RequestInterceptor);

  axiousInstance.interceptors.response.use((response) => response, ResponseInterceptor);

  return axiousInstance;
};
