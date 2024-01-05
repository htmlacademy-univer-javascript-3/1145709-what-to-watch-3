import {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {getToken, setToken} from './utils.ts';
import {toast} from 'react-toastify';
import {ErrorDetailsMessage} from '../types/response-error-type.ts';

enum StatusCodes {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => StatusCodeMapping[response.status];


export const ResponseInterceptor = (error: AxiosError<ErrorDetailsMessage>) => {
  if (error.response && shouldDisplayError(error.response)) {
    const detailMessage = error.response.data;

    toast.warn(detailMessage.message,
      {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: 'light',
      });
  }

  if (error.response?.status === StatusCodes.UNAUTHORIZED) {
    setToken('');
  }

  throw error;
};

export const RequestInterceptor = (config: AxiosRequestConfig) => {
  const token = getToken();

  if (token && config.headers) {
    config.headers['x-token'] = token;
  }

  return config;
};

