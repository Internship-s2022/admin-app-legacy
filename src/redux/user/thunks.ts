import { Dispatch } from 'redux';

import { getUsersError, getUsersPending, getUsersSuccess } from './actions';
import { AppThunk, userRequest } from './types';

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
