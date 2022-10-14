import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, ActionType } from 'typesafe-actions';

import { RootState } from '../store';
import * as actions from './actions';

export interface Employee {
  skills?: string[];
  seniority: string;
  projectHistory?: string[];
  absences?: string[];
  userId: string;
  potentialRole?: string[];
  notes?: string;
}

export interface State {
  employees: Employee[];
  isLoading: boolean;
  error: string;
}

export type ActionsType = ActionType<typeof actions>;
export type ApiResponse<T> = { message: string; data: T; error: boolean };
