import { Dispatch } from 'redux';

import { getResourceRequest } from 'src/config/api';
import { ApiRoutes } from 'src/constants';

import { AppThunk } from '../types';
import { setLoaderOff, setLoaderOn } from '../ui/actions';
<<<<<<< HEAD
import {
  editEmployeeError,
  editEmployeePending,
  editEmployeeSuccess,
  getEmployeeError,
  getEmployeePending,
  getEmployeeSuccess,
} from './actions';
import { editEmployeeRequest, getEmployeesRequest } from './api';
import { Employee } from './types';
=======
import { getEmployeeError, getEmployeePending, getEmployeeSuccess } from './actions';
>>>>>>> RA-156: Changed redux flow to make generic requests functions

export const getEmployees: AppThunk = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getEmployeePending());
      dispatch(setLoaderOn());
      const response = await getResourceRequest(ApiRoutes.EMPLOYEE);
      if (response.data?.length) {
        dispatch(getEmployeeSuccess(response.data));
      }
      dispatch(setLoaderOff());
    } catch (error) {
      dispatch(getEmployeeError({ message: error.message, networkError: error.networkError }));
      dispatch(setLoaderOff());
    }
  };
};

export const editEmployee: AppThunk = (options: { body: Employee; id: string }) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(editEmployeePending());
      dispatch(setLoaderOn());
      const response = await editEmployeeRequest(options);
      if (!response.error) {
        dispatch(setLoaderOff());
        return dispatch(editEmployeeSuccess(response.data, options.id));
      }
    } catch (error) {
      if (error.code !== 'ERR_NETWORK') {
        dispatch(editEmployeeError(error.response.data.message));
        dispatch(setLoaderOff());
      } else {
        dispatch(editEmployeeError(error.message));
        dispatch(setLoaderOff());
      }
    }
  };
};
