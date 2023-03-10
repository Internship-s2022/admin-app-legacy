import { action } from 'typesafe-actions';

import { ErrorFormat } from 'src/redux/types';

import { Actions } from './constants';
import { Client } from './types';

export const getClientsPending = () => action(Actions.GET_CLIENTS_PENDING);

export const getClientsSuccess = (clients: Client[]) =>
  action(Actions.GET_CLIENTS_SUCCESS, clients);

export const getClientsError = (error: ErrorFormat) => action(Actions.GET_CLIENTS_ERROR, error);

export const getClientByIdPending = () => action(Actions.GET_CLIENT_BY_ID_PENDING);

export const getClientByIdSuccess = (client: Client) =>
  action(Actions.GET_CLIENT_BY_ID_SUCCESS, client);

export const getClientByIdError = (error: ErrorFormat) =>
  action(Actions.GET_CLIENT_BY_ID_ERROR, error);

export const deleteClientPending = () => action(Actions.DELETE_CLIENT_PENDING);

export const deleteClientSuccess = (id: string) => action(Actions.DELETE_CLIENT_SUCCESS, id);

export const deleteClientError = (error: ErrorFormat) => action(Actions.DELETE_CLIENT_ERROR, error);

export const addClientPending = () => action(Actions.ADD_CLIENT_PENDING);

export const addClientSuccess = (client: Client) => action(Actions.ADD_CLIENT_SUCCESS, client);

export const addClientError = (error: ErrorFormat) => action(Actions.ADD_CLIENT_ERROR, error);

export const editClientPending = () => action(Actions.EDIT_CLIENT_PENDING);

export const editClientSuccess = (client: Client, id: string) =>
  action(Actions.EDIT_CLIENT_SUCCESS, { client, id });

export const editClientError = (error: ErrorFormat) => action(Actions.EDIT_CLIENT_ERROR, error);

export const clearSelectedClient = () => action(Actions.CLEAR_SELECTED_CLIENT);
