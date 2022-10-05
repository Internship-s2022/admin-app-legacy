import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import { RootState } from '../store';
import * as actions from './actions';

export interface User {
  _id?: string;
  firebaseUid?: string;
  accessRoleType?: string;
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

export type ActionsType = ActionType<typeof actions>;
export type AppThunk = ActionCreator<ThunkAction<void, RootState, null, Action<null>>>;
export type ApiResponse<T> = { message: string; data: T; error: boolean };
