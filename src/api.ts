import axios from 'axios';

export const getAxiosObject = () => axios.create({
  baseURL: 'https://13.design.pages.academy/wtw',
  timeout: 5000,
});
