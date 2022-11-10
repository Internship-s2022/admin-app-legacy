import { action } from 'typesafe-actions';

import { ErrorFormat } from 'src/redux/types';

import { Actions } from './constants';
import { Client } from './types';

export const getClientsPending = () => action(Actions.GET_CLIENTS_PENDING);
export const getClientsSuccess = (clients: Client[]) =>
  action(Actions.GET_CLIENTS_SUCCESS, clients);
export const getClientsError = (error: ErrorFormat) => action(Actions.GET_CLIENTS_ERROR, error);
