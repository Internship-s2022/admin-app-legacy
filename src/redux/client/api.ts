import { AxiosResponse } from 'axios';

import api from 'src/config/api';
import { ApiRoutes } from 'src/constants';

import { Client } from './types';

const responseBody = (response: AxiosResponse) => response.data;

export const getClientsRequest = () => api.get<Client[]>(ApiRoutes.CLIENT).then(responseBody);
