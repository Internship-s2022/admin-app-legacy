import { AxiosResponse } from 'axios';

import api from 'src/config/api';
import { ApiRoutes } from 'src/constants';

import { Employee } from './types';

const responseBody = (response: AxiosResponse) => response.data;

export const getEmployeesRequest = () => api.get<Employee[]>(ApiRoutes.EMPLOYEE).then(responseBody);
