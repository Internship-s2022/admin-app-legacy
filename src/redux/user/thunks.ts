import { Dispatch } from 'redux';

import { AppThunk } from '../types';
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
      const response = await getUsersRequest();
      if (response.data?.length) {
        return dispatch(getUsersSuccess(response.data));
      }
    } catch (error) {
      dispatch(getUsersError(error));
    }
  };
};

export const addUser: AppThunk = (data) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(addUserPending());
      const response = await addUserRequest(data);
      if (!response.error) {
        return dispatch(addUserSuccess(response.data));
      }
    } catch (error) {
      dispatch(addUsersError(error));
    }
  };
};

export const editUser: AppThunk = (options: { id: string; body: User }) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(editUserPending());
      const response = await editUserRequest(options);
      if (!response.error) {
        return dispatch(editUserSuccess(response.data.accessRoleType, options.id));
      }
    } catch (error) {
      dispatch(editUserError(error));
    }
  };
};

export const deleteUser: AppThunk = (id) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(deleteUserPending());
      const response = await deleteUserRequest(id);
      if (!response.error) {
        return dispatch(deleteUserSuccess(id));
      }
    } catch (error) {
      dispatch(deleteUserError(error));
    }
  };
};
