import { Dispatch } from 'redux';

import {
  addResourceRequest,
  deleteResourceRequest,
  editResourceRequest,
  getResourceRequest,
} from 'src/config/api';
import { ApiRoutes } from 'src/constants';

import { AppThunk } from '../types';
import { setLoaderOff, setLoaderOn, setOpenMessageAlert } from '../ui/actions';
import {
  addUserPending,
  addUsersError,
  addUserSuccess,
  deleteUserError,
  deleteUserPending,
  deleteUserSuccess,
  editUserError,
  editUserPending,
  editUserSuccess,
  getUsersError,
  getUsersPending,
  getUsersSuccess,
} from './actions';
import { User } from './types';

export const getUsers: AppThunk = () => {
  return async (dispatch: Dispatch) => {
    dispatch(getUsersPending());
    dispatch(setLoaderOn());
    try {
      const response = await getResourceRequest(ApiRoutes.USER);
      if (response.data?.length) {
        dispatch(getUsersSuccess(response.data));
      }
    } catch (error) {
      dispatch(getUsersError({ message: error.message, networkError: error.networkError }));
    } finally {
      dispatch(setLoaderOff());
    }
  };
};

export const addUser: AppThunk = (data) => {
  return async (dispatch: Dispatch) => {
    dispatch(addUserPending());
    dispatch(setLoaderOn());
    try {
      const response = await addResourceRequest(ApiRoutes.USER, data);
      if (!response.error) {
        dispatch(addUserSuccess(response.data));
      }
    } catch (error) {
      dispatch(addUsersError({ message: error.message, networkError: error.networkError }));
    } finally {
      dispatch(setLoaderOff());
    }
  };
};

export const editUser: AppThunk = (options: { id: string; body: User }) => {
  return async (dispatch: Dispatch) => {
    dispatch(editUserPending());
    dispatch(setLoaderOn());
    try {
      const response = await editResourceRequest(ApiRoutes.USER, options);
      if (!response.error) {
        dispatch(editUserSuccess(response.data.accessRoleType, options.id));
      }
    } catch (error) {
      dispatch(editUserError({ message: error.message, networkError: error.networkError }));
    } finally {
      dispatch(setLoaderOff());
      dispatch(setOpenMessageAlert());
    }
  };
};

export const deleteUser: AppThunk = (id) => {
  return async (dispatch: Dispatch) => {
    dispatch(deleteUserPending());
    dispatch(setLoaderOn());
    try {
      const response = await deleteResourceRequest(ApiRoutes.USER, id);
      if (!response.error) {
        dispatch(deleteUserSuccess(id));
      }
    } catch (error) {
      dispatch(deleteUserError({ message: error.message, networkError: error.networkError }));
    } finally {
      dispatch(setLoaderOff());
      dispatch(setOpenMessageAlert());
    }
  };
};
