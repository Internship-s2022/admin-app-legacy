import { AxiosResponse } from 'axios';

import api from 'src/config/api';
import { ApiRoutes } from 'src/constants';

import { User } from './types';

const responseBody = (response: AxiosResponse) => response.data;

export const getUsersRequest = () => api.get<User[]>(ApiRoutes.USER).then(responseBody);

export const addUserRequest = (body: User) =>
  api.post<User>(ApiRoutes.USER, body).then(responseBody);

export const editUserRequest = (options: { body: User; id: string }) =>
  api.patch<User>(`${ApiRoutes.USER}/${options.id}`, options.body).then(responseBody);
