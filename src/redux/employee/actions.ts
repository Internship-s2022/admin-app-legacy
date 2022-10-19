import { action } from 'typesafe-actions';

import { Actions } from './constants';
import { Employee } from './types';

export const getEmployeePending = () => action(Actions.GET_EMPLOYEE_PENDING);

export const getEmployeeSuccess = (employees: Employee[]) =>
  action(Actions.GET_EMPLOYEE_SUCCESS, employees);

export const getEmployeeError = (error: string) => action(Actions.GET_EMPLOYEE_ERROR, error);
