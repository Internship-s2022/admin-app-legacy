import { action } from 'typesafe-actions';

import { Actions } from './constants';
import { Employee } from './types';

export const getEmployeePending = () => action(Actions.GET_EMPLOYEE_PENDING);

export const getEmployeeSuccess = (employees: Employee[]) =>
  action(Actions.GET_EMPLOYEE_SUCCESS, employees);

export const getEmployeeError = (error: string) => action(Actions.GET_EMPLOYEE_ERROR, error);

export const editEmployeePending = () => action(Actions.EDIT_EMPLOYEE_PENDING);

export const editEmployeeSuccess = (body: Employee, id: string) =>
  action(Actions.EDIT_EMPLOYEE_SUCCESS, { body, id });

export const editEmployeeError = (error: string) => action(Actions.EDIT_EMPLOYEE_ERROR, error);