import { AxiosResponse } from 'axios';

import api from 'src/config/api';
import { ApiRoutes } from 'src/constants';

import { Employee } from './types';

const responseBody = (response: AxiosResponse) => response.data;

export const getEmployeesRequest = () => api.get<Employee[]>(ApiRoutes.EMPLOYEE).then(responseBody);

export const editEmployeeRequest = (options: { body: Employee; id: string }) =>
  api.patch<Employee>(`${ApiRoutes.EMPLOYEE}/${options.id}`, options.body).then(responseBody);
