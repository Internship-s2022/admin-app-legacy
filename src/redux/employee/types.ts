import { ActionType } from 'typesafe-actions';

import { Projects, User } from 'src/components/pages/employees/types';

import * as actions from './actions';

export interface Employee {
  _id: string;
  skills?: string[];
  seniority: string;
  projectHistory?: Projects[];
  absences?: string[];
  potentialRole?: string[];
  notes?: string;
  careerPlan: string;
  user: User;
}

export type ActionsType = ActionType<typeof actions>;
