import axios, {AxiosError} from 'axios';
import {clearAuthData} from './store/action.ts';
import {store} from './store/store.ts';

export const getAxiosObject = () => {
  const axiousInstance = axios.create({
    baseURL: 'https://13.design.pages.academy/wtw',
    timeout: 5000,
    headers: {
      'X-Token': localStorage.getItem('token') ?? '',
    }
  });

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
