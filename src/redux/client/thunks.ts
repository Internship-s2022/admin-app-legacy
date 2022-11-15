import { Dispatch } from 'redux';

import {
  addResourceRequest,
  deleteResourceRequest,
  editResourceRequest,
  getResourceRequest,
} from 'src/config/api';
import { ApiRoutes } from 'src/constants';
import { AppThunk } from 'src/redux/types';

import { setLoaderOff, setLoaderOn } from '../ui/actions';
import {
  addClientError,
  addClientPending,
  addClientSuccess,
  deleteClientError,
  deleteClientPending,
  deleteClientSuccess,
  editClientError,
  editClientPending,
  editClientSuccess,
  getClientByIdError,
  getClientByIdPending,
  getClientByIdSuccess,
  getClientsError,
  getClientsPending,
  getClientsSuccess,
} from './actions';
import { Client } from './types';

export const getClients: AppThunk = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getClientsPending());
      dispatch(setLoaderOn());
      const response = await getResourceRequest(ApiRoutes.CLIENT);
      if (response.data?.length) {
        dispatch(getClientsSuccess(response.data));
        dispatch(setLoaderOff());
      }
    } catch (error) {
      dispatch(getClientsError({ message: error.message, networkError: error.networkError }));
      dispatch(setLoaderOff());
    }
  };
};

export const getClientsById: AppThunk = (id) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getClientByIdPending());
      dispatch(setLoaderOn());
      const response = await getResourceRequest(`${ApiRoutes.CLIENT}/${id}`);
      if (response.data) {
        dispatch(getClientByIdSuccess(response.data));
        dispatch(setLoaderOff());
      }
    } catch (error) {
      dispatch(getClientByIdError({ message: error.message, networkError: error.networkError }));
      dispatch(setLoaderOff());
    }
  };
};

export const deleteClient: AppThunk = (id) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(deleteClientPending());
      dispatch(setLoaderOn());
      const response = await deleteResourceRequest(ApiRoutes.CLIENT, id);
      if (!response.error) {
        dispatch(deleteClientSuccess(id));
      }
      dispatch(setLoaderOff());
    } catch (error) {
      dispatch(deleteClientError({ message: error.message, networkError: error.networkError }));
      dispatch(setLoaderOff());
    }
  };
};

export const addClient: AppThunk = (data) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(addClientPending());
      dispatch(setLoaderOn());
      const response = await addResourceRequest(ApiRoutes.CLIENT, data);
      if (!response.error) {
        dispatch(addClientSuccess(response.data));
      }
      dispatch(setLoaderOff());
    } catch (error) {
      dispatch(addClientError({ message: error.message, networkError: error.networkError }));
      dispatch(setLoaderOff());
    }
  };
};

export const editClient: AppThunk = (options: { body: Client; id: string }) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(editClientPending());
      dispatch(setLoaderOn());

      const response = await editResourceRequest(ApiRoutes.CLIENT, options);
      if (!response.error) {
        return dispatch(editClientSuccess(response.data, options.id));
      }
      dispatch(setLoaderOff());
    } catch (error: any) {
      dispatch(editClientError({ message: error.message, networkError: error.networkError }));
      dispatch(setLoaderOff());
    }
  };
};
