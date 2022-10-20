import { Dispatch } from 'redux';

import { AppThunk } from '../types';
import { setLoaderOff, setLoaderOn } from '../ui/actions';
import { getEmployeeError, getEmployeePending, getEmployeeSuccess } from './actions';
import { getEmployeesRequest } from './api';

export const getEmployees: AppThunk = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getEmployeePending());
      dispatch(setLoaderOn());
      const response = await getEmployeesRequest();
      if (response.data?.length) {
        dispatch(getEmployeeSuccess(response.data));
        dispatch(setLoaderOff());
      }
    } catch (error) {
      if (error.code !== 'ERR_NETWORK') {
        dispatch(getEmployeeError(error.response.data.message));
        dispatch(setLoaderOff());
      } else {
        dispatch(getEmployeeError(error.message));
        dispatch(setLoaderOff());
      }
    }
  };
};
