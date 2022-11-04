import { Dispatch } from 'redux';

import { AppThunk } from '../types';
import { setLoaderOff, setLoaderOn } from '../ui/actions';
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

export const editEmployee: AppThunk = (options: { body: Employee; id: string }) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(editEmployeePending());
      dispatch(setLoaderOn());
      const response = await editEmployeeRequest(options);
      if (!response.error) {
        dispatch(editEmployeeSuccess(response.data, options.id));
        dispatch(setLoaderOff());
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
