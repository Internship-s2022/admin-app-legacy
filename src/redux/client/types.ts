import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import { RootState } from '../store';
import * as actions from './actions';

export interface Client {
  _id: string;
  firebaseUid?: string;
  name: string;
  localContact: string;
  clientContact: string;
  projects?: string[];
  relationshipStart?: Date;
  relationshipEnd?: Date;
  notes?: string;
  isActive: boolean;
}

export interface State {
  clients: Client[];
  isLoading: boolean;
  error: string;
}

export type ActionsType = ActionType<typeof actions>;
export type ApiResponse<T> = { message: string; data: T; error: boolean };
export type AppThunk = ActionCreator<ThunkAction<void, RootState, null, Action<null>>>;
