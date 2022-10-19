import { AxiosResponse } from 'axios';

import api from 'src/config/api';
import { ApiRoutes } from 'src/constants';

import { Project } from './types';

const responseBody = (response: AxiosResponse) => response.data;

export const getProjectsRequest = () => api.get<Project[]>(ApiRoutes.PROJECTS).then(responseBody);
