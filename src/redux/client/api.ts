import { AxiosResponse } from 'axios';

import api from 'src/config/api';
import { ApiRoutes } from 'src/constants';

import { Client } from './types';

const responseBody = (response: AxiosResponse) => response.data;

export const getClientsRequest = () => api.get<Client[]>(ApiRoutes.CLIENT).then(responseBody);

// export const addClientRequest = (body: Client) =>
//   api.post<Client>(ApiRoutes.CLIENT, body).then(responseBody);

// export const editClientRequest = (options: { body: Client; id: string }) =>
//   api.patch<Client>(`${ApiRoutes.CLIENT}/${options.id}`, options.body).then(responseBody);

// export const deleteUserRequest = (id: string) =>
//   api.patch<Client>(`${ApiRoutes.CLIENT}/delete/${id}`).then(responseBody);
