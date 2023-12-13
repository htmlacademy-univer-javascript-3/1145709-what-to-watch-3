import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {clearAuthData} from './store/action.ts';
import {store} from './store/store.ts';

export function getToken() {
  return localStorage.getItem('token') ?? '';
}

export function setToken(token: string){
  localStorage.setItem('token', token);
}
export const getAxiosObject = () => {
  const axiousInstance = axios.create({
    baseURL: 'https://13.design.pages.academy/wtw',
    timeout: 5000,
  });

  axiousInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  axiousInstance.interceptors.response.use((response) =>
    response
  , (error: AxiosError) => {
    const dispatch = store.dispatch;

    if (error.response?.status === 401) {
      dispatch(clearAuthData());
      localStorage.removeItem('token');
    }

    return Promise.reject(error);
  });

  return axiousInstance;
};
