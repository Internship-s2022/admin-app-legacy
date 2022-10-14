import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import { RootState } from '../store';
import { User } from '../user/types';
import * as actions from './actions';

interface Employee {
  skills?: string[];
  seniority?: string;
  projectHistory?: string[];
  absences?: string[];
  user: User;
  potentialRole?: string[];
  notes?: string;
}

interface Shadow {
  id: string;
  shadowReference: Employee;
  dependency: number;
  dedication: number;
  active: boolean;
}

interface Member {
  _id: string;
  hasShadow: boolean;
  shadow: Shadow[];
  employeeId: string;
  projectId: string;
  role: string;
  dedication: number;
  startDate: Date;
  endDate: Date;
  active: boolean;
}

export interface Project {
  _id?: string;
  clientName: string;
  projectName: string;
  description: string;
  notes: string;
  startDate: Date;
  endDate: Date;
  members: Member[];
  isCritic: string;
  isUpdated: boolean;
  projectType: string;
  isActive: boolean;
}

export interface State {
  projects: Project[];
  isLoading: boolean;
  error: string;
}

export type ActionsType = ActionType<typeof actions>;
export type AppThunk = ActionCreator<ThunkAction<void, RootState, null, Action<null>>>;
export type ApiResponse<T> = { message: string; data: T; error: boolean };
