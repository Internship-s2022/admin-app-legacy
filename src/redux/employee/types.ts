import { ActionType } from 'typesafe-actions';

import { User } from 'src/components/pages/employees/types';

import * as actions from './actions';

export interface Employee {
  _id: string;
  skills?: string[];
  seniority: string;
  projectHistory?: string[];
  absences?: string[];
  potentialRole?: string[];
  notes?: string;
  user: User;
}

export interface State {
  employees: Employee[];
  isLoading: boolean;
  error: string;
}

export type ActionsType = ActionType<typeof actions>;
export type ApiResponse<T> = { message: string; data: T; error: boolean };
