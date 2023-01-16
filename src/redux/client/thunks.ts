import { Dispatch } from 'redux';

import {
  addResourceRequest,
  deleteResourceRequest,
  editResourceRequest,
  getResourceRequest,
} from 'src/config/api';
import { ApiRoutes } from 'src/constants';
import { AppThunk } from 'src/redux/types';

import { setLoaderOff, setLoaderOn, setOpenMessageAlert } from '../ui/actions';
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
    dispatch(getClientsPending());
    dispatch(setLoaderOn());
    try {
      const response = await getResourceRequest(ApiRoutes.CLIENT);
      if (response.data?.length) {
        dispatch(getClientsSuccess(response.data));
      }
    } catch (error) {
      dispatch(getClientsError({ message: error.message, errorType: error.errorType }));
    } finally {
      dispatch(setLoaderOff());
    }
  };
};

export const getClientsById: AppThunk = (id) => {
  return async (dispatch: Dispatch) => {
    dispatch(getClientByIdPending());
    dispatch(setLoaderOn());
    try {
      const response = await getResourceRequest(`${ApiRoutes.CLIENT}/${id}`);
      if (response.data) {
        dispatch(getClientByIdSuccess(response.data));
      }
    } catch (error) {
      dispatch(getClientByIdError({ message: error.message, errorType: error.errorType }));
    } finally {
      dispatch(setLoaderOff());
    }
  };
};

export const deleteClient: AppThunk = (id) => {
  return async (dispatch: Dispatch) => {
    dispatch(deleteClientPending());
    dispatch(setLoaderOn());
    try {
      const response = await deleteResourceRequest(ApiRoutes.CLIENT, id);
      if (!response.error) {
        dispatch(deleteClientSuccess(id));
      }
    } catch (error) {
      dispatch(deleteClientError({ message: error.message, errorType: error.errorType }));
    } finally {
      dispatch(setLoaderOff());
      dispatch(setOpenMessageAlert());
    }
  };
};

export const addClient: AppThunk = (data) => {
  return async (dispatch: Dispatch) => {
    dispatch(addClientPending());
    dispatch(setLoaderOn());
    try {
      const response = await addResourceRequest(ApiRoutes.CLIENT, data.body);
      if (!response.error) {
        return dispatch(addClientSuccess(response.data));
      }
    } catch (error) {
      return dispatch(addClientError({ message: error.message, errorType: error.errorType }));
    } finally {
      dispatch(setLoaderOff());
      dispatch(setOpenMessageAlert());
    }
  };
};

export const editClient: AppThunk = (options: { body: Client; id: string }) => {
  return async (dispatch: Dispatch) => {
    dispatch(editClientPending());
    dispatch(setLoaderOn());
    try {
      const response = await editResourceRequest(ApiRoutes.CLIENT, options);
      if (!response.error) {
        return dispatch(editClientSuccess(response.data, options.id));
      }
    } catch (error: any) {
      return dispatch(editClientError({ message: error.message, errorType: error.errorType }));
    } finally {
      dispatch(setLoaderOff());
      dispatch(setOpenMessageAlert());
    }
  };
};
