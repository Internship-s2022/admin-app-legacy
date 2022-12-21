import { action } from 'typesafe-actions';

import { ErrorFormat } from 'src/redux/types';

import { Actions } from './constants';
import { Employee } from './types';

export const getEmployeePending = () => action(Actions.GET_EMPLOYEE_PENDING);

export const getEmployeeSuccess = (employees: Employee[]) =>
  action(Actions.GET_EMPLOYEE_SUCCESS, employees);

export const getEmployeeError = (error: ErrorFormat) => action(Actions.GET_EMPLOYEE_ERROR, error);

export const getEmployeeByIdPending = () => action(Actions.GET_EMPLOYEE_BY_ID_PENDING);

export const getEmployeeByIdSuccess = (employee: Employee) =>
  action(Actions.GET_EMPLOYEE_BY_ID_SUCCESS, employee);

export const getEmployeeByIdError = (error: ErrorFormat) =>
  action(Actions.GET_EMPLOYEE_BY_ID_ERROR, error);

export const editEmployeePending = () => action(Actions.EDIT_EMPLOYEE_PENDING);

export const editEmployeeSuccess = (body: Employee, id: string) =>
  action(Actions.EDIT_EMPLOYEE_SUCCESS, { body, id });

export const editEmployeeError = (error: ErrorFormat) => action(Actions.EDIT_EMPLOYEE_ERROR, error);
