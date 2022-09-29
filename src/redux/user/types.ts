import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import { RootState } from '../store';
import * as actions from './actions';
import * as thunks from './thunks';

export enum AccesRoleType {
  MANAGER = 'Manager',
  SUPER_ADMIN = 'Super_Admin',
  ADMIN = 'Admin',
  EMPLOYEE = 'Employee',
}

export interface User {
  firebaseUid: string;
  accesRoleType: AccesRoleType;
  email: string;
  firstName: string;
  lastName: string;
  location: string;
  workedHours?: number;
  isActive: boolean;
}

export interface State {
  users: User[];
  isPending: boolean;
  error: string;
}

export enum Actions {
  GET_USERS_SUCCESS = 'GET_USERS_SUCCESS',
  GET_USERS_PENDING = 'GET_USERS_PENDING',
  GET_USERS_ERROR = 'GET_USERS_ERROR',
}

export type ActionsType = ActionType<typeof actions>;
export type AppThunk = ActionCreator<ThunkAction<void, RootState, null, Action<null>>>;
export type ApiResponse<T> = { message: string; data: T; error: boolean };
