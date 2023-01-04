import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { RootState } from './store';

export type AppThunk = ActionCreator<ThunkAction<void, RootState, null, Action<null>>>;

export interface ErrorFormat {
  message: string;
  errorType: ErrorType;
}

export enum ErrorType {
  CLIENT_ERROR = 'CLIENT_ERROR',
  NETWORK_ERROR = 'ERR_NETWORK',
  AUTH_ERROR = 'AUTH_ERROR',
}
export interface State<T> {
  list: T[];
  isLoading: boolean;
  error: ErrorFormat;
}
