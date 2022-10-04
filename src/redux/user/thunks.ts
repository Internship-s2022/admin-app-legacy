import { Dispatch } from 'redux';

import { userRequest } from 'src/config/api';

import {
  addUserPendign,
  addUsersError,
  addUserSuccess,
  getUsersError,
  getUsersPending,
  getUsersSuccess,
} from './actions';
import { AppThunk } from './types';

export const getUsers: AppThunk = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getUsersPending());
      const response = await userRequest.get('/user');
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
      dispatch(addUserPendign());
      const response = await userRequest.post('/user', data);
      if (response.data?.length) {
        return dispatch(addUserSuccess(response.data));
      }
    } catch (error) {
      dispatch(addUsersError(error));
    }
  };
};
