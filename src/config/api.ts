import axios, { AxiosResponse } from 'axios';

import { ApiRoutes } from 'src/constants';
import { User } from 'src/redux/user/types';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const responseBody = (response: AxiosResponse) => response.data;

export const getUsersRequest = () => api.get<User[]>(ApiRoutes.USER).then(responseBody);

export const adduserRequest = (body: User) =>
  api.post<User>(ApiRoutes.USER, body).then(responseBody);

export const deleteUserRequest = (id: string) =>
  api.patch<User>(`${ApiRoutes.USER}/${id}`).then(responseBody);

export default api;
