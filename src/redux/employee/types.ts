import { ActionType } from 'typesafe-actions';

import { AbsencesData } from 'src/components/pages/employees/employeeForm/absencesModal/types';
import { Projects, User } from 'src/components/pages/employees/types';

import { State } from '../types';
import * as actions from './actions';

export interface Employee {
  _id: string;
  skills?: string[];
  seniority: string;
  projectHistory?: Projects[];
  absences?: AbsencesData[];
  potentialRole?: string[];
  notes?: string;
  careerPlan: string;
  user: User;
  availability: boolean;
}

export interface EmployeeState extends State<Employee> {
  selectedEmployee: Employee;
}

export type ActionsType = ActionType<typeof actions>;
