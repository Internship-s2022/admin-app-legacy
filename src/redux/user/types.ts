import { AxiosResponse } from 'axios';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import api from 'src/config/api';

import { RootState } from '../store';
import * as actions from './actions';

export interface User {
  _id?: string;
  firebaseUid?: string;
  accessRoleType: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  location?: string;
  workedHours?: number;
  isActive?: boolean;
}

export interface State {
  users: User[];
  isPending: boolean;
  error: string;
}

const responseBody = (response: AxiosResponse) => response.data;

export const userRequest = {
  get: (url: string) => api.get<User[]>(url).then(responseBody),
  post: (url: string, body: User) => api.post<User>(url, body).then(responseBody),
};

export type ActionsType = ActionType<typeof actions>;
export type AppThunk = ActionCreator<ThunkAction<void, RootState, null, Action<null>>>;
export type ApiResponse<T> = { message: string; data: T; error: boolean };
