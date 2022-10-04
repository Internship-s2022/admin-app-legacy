import axios, { AxiosResponse } from 'axios';

import { User } from 'src/redux/user/types';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const responseBody = (response: AxiosResponse) => response.data;

export const userRequest = {
  get: (url: string) => api.get<User[]>(url).then(responseBody),
  post: (url: string, body: User) => api.post<User>(url, body).then(responseBody),
};

export default api;
