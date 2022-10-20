import { Dispatch } from 'redux';

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
import { addUserRequest, deleteUserRequest, editUserRequest, getUsersRequest } from './api';
import { User } from './types';

export const getUsers: AppThunk = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getUsersPending());
      dispatch(setLoaderOn());
      const response = await getUsersRequest();
      if (response.data?.length) {
        dispatch(getUsersSuccess(response.data));
        dispatch(setLoaderOff());
      }
    } catch (error) {
      if (error.code !== 'ERR_NETWORK') {
        dispatch(getUsersError(error.response.data.message));
        dispatch(setLoaderOff());
      } else {
        dispatch(getUsersError(error.message));
        dispatch(setLoaderOff());
      }
    }
  };
};

export const addUser: AppThunk = (data) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(addUserPending());
      dispatch(setLoaderOn());
      const response = await addUserRequest(data);
      if (!response.error) {
        dispatch(addUserSuccess(response.data));
        dispatch(setLoaderOff());
      }
    } catch (error) {
      dispatch(addUsersError(error));
      dispatch(setLoaderOff());
    }
  };
};

export const editUser: AppThunk = (options: { id: string; body: User }) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(editUserPending());
      dispatch(setLoaderOn());
      const response = await editUserRequest(options);
      if (!response.error) {
        dispatch(editUserSuccess(response.data.accessRoleType, options.id));
        dispatch(setLoaderOff());
      }
    } catch (error) {
      dispatch(editUserError(error));
      dispatch(setLoaderOff());
    }
  };
};

export const deleteUser: AppThunk = (id) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(deleteUserPending());
      dispatch(setLoaderOn());
      const response = await deleteUserRequest(id);
      if (!response.error) {
        dispatch(deleteUserSuccess(id));
        dispatch(setLoaderOff());
      }
    } catch (error) {
      dispatch(deleteUserError(error));
      dispatch(setLoaderOff());
    }
  };
};
