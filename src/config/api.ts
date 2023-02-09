import axios, { AxiosResponse } from 'axios';

import { setAuthError } from 'src/redux/auth/actions';
import store from 'src/redux/store';
import { ErrorFormat, ErrorType } from 'src/redux/types';

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
  if (error.code === ErrorType.NETWORK_ERROR) {
    throw {
      message: error.message,
      errorType: ErrorType.NETWORK_ERROR,
    };
  }
  if (error.response.status === 403) {
    store.dispatch(setAuthError(true));

    throw {
      message: error.response.data.message,
      errorType: ErrorType.AUTH_ERROR,
    };
  }
  throw {
    message: error.response.data.message,
    errorType: ErrorType.CLIENT_ERROR,
  };
};

export const getResourceRequest = <T>(apiRoute) =>
  api.get<T[]>(apiRoute).then(responseBody).catch<ErrorFormat>(parseError);

export const getByFilterResourceRequest = <T>(apiRoute, filter) =>
  api
    .get<T[]>(`${apiRoute}/`, { params: filter })
    .then(responseBody)
    .catch<ErrorFormat>(parseError);

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
