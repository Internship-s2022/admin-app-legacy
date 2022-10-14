import { ActionType } from 'typesafe-actions';

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
