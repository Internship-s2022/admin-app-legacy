import { ActionType } from 'typesafe-actions';

import { RoleType } from 'src/components/pages/storybook/types';

import { Employee } from '../employee/types';
import { Project } from '../project/types';
import * as actions from './actions';

export interface Helper {
  _id: string;
  helperReference: Employee;
  dependency: number;
  dedication: number;
  isActive: boolean;
}

export interface Member {
  _id: string;
  helper: Helper;
  employee: string;
  project: string;
  role: RoleType;
  memberDedication: number;
  startDate: Date;
  endDate: Date;
  active: boolean;
}

export type ActionsType = ActionType<typeof actions>;
