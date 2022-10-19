import { Dispatch } from 'redux';

import { AppThunk } from '../user/types';
import { getEmployeeError, getEmployeePending, getEmployeeSuccess } from './actions';
import { getEmployeesRequest } from './api';

export const getEmployees: AppThunk = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getEmployeePending());
      const response = await getEmployeesRequest();
      if (response.data?.length) {
        return dispatch(getEmployeeSuccess(response.data));
      }
    } catch (error) {
      if (error.code !== 'ERR_NETWORK') {
        dispatch(getEmployeeError(error.response.data.message));
      } else {
        dispatch(getEmployeeError(error.message));
      }
    }
  };
};
