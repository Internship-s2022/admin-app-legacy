import axios, { AxiosResponse } from 'axios';

import { ErrorFormat } from 'src/redux/types';

const token = localStorage.getItem('token');

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    token: token,
  },
});

const responseBody = (response: AxiosResponse) => response.data;

const parseError = (error) => {
  if (error.code !== 'ERR_NETWORK') {
    throw {
      message: error.response.data,
      networkError: false,
    };
  }
  throw {
    message: error.message,
    networkError: true,
  };
};

export const getResourceRequest = <T>(apiRoute) =>
  api.get<T[]>(apiRoute).then(responseBody).catch<ErrorFormat>(parseError);

export const addResourceRequest = <T>(apiRoute, body: T) =>
  api.post<T>(apiRoute, body).then(responseBody).catch<ErrorFormat>(parseError);

export const editResourceRequest = <T>(apiRoute, options: { body: T; id: string }) =>
  api
    .patch<T>(`${apiRoute}/${options.id}`, options.body)
    .then(responseBody)
    .catch<ErrorFormat>(parseError);

export const deleteResourceRequest = <T>(apiRoute, id: string) =>
  api.patch<T>(`${apiRoute}/delete/${id}`).then(responseBody).catch<ErrorFormat>(parseError);

export default api;
