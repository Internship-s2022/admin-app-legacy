import { Dispatch } from 'redux';

import {
  addResourceRequest,
  deleteResourceRequest,
  editResourceRequest,
  getResourceRequest,
} from 'src/config/api';
import { ApiRoutes } from 'src/constants';

import { AppThunk } from '../types';
import { setLoaderOff, setLoaderOn } from '../ui/actions';
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
    try {
      dispatch(getUsersPending());
      dispatch(setLoaderOn());
      const response = await getResourceRequest(ApiRoutes.USER);
      if (response.data?.length) {
        dispatch(getUsersSuccess(response.data));
      }
      dispatch(setLoaderOff());
    } catch (error) {
      dispatch(getUsersError({ message: error.message, networkError: error.networkError }));
      dispatch(setLoaderOff());
    }
  };
};

export const addUser: AppThunk = (data) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(addUserPending());
      dispatch(setLoaderOn());
      const response = await addResourceRequest(ApiRoutes.USER, data);
      if (!response.error) {
        dispatch(addUserSuccess(response.data));
      }
      dispatch(setLoaderOff());
    } catch (error) {
      dispatch(addUsersError({ message: error.message, networkError: error.networkError }));
      dispatch(setLoaderOff());
    }
  };
};

export const editUser: AppThunk = (options: { id: string; body: User }) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(editUserPending());
      dispatch(setLoaderOn());
      const response = await editResourceRequest(ApiRoutes.USER, options);
      if (!response.error) {
        dispatch(editUserSuccess(response.data.accessRoleType, options.id));
      }
      dispatch(setLoaderOff());
    } catch (error) {
      dispatch(editUserError({ message: error.message, networkError: error.networkError }));
      dispatch(setLoaderOff());
    }
  };
};

export const deleteUser: AppThunk = (id) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(deleteUserPending());
      dispatch(setLoaderOn());
      const response = await deleteResourceRequest(ApiRoutes.USER, id);
      if (!response.error) {
        dispatch(deleteUserSuccess(id));
      }
      dispatch(setLoaderOff());
    } catch (error) {
      dispatch(deleteUserError({ message: error.message, networkError: error.networkError }));
      dispatch(setLoaderOff());
    }
  };
};
