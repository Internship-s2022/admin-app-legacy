import { AxiosResponse } from 'axios';

import api from 'src/config/api';
import { ApiRoutes } from 'src/constants';

import { User } from '../user/types';

const responseBody = (response: AxiosResponse) => response.data;

export const authUserRequest = (body: User) =>
  api.patch<User>(ApiRoutes.AUTH, body).then(responseBody);

// export const fetchUserRequest = (role) => api.get(ApiRoutes[role]).then(responseBody);
