import { Dispatch } from 'redux';

import { editResourceRequest, getResourceRequest } from 'src/config/api';
import { ApiRoutes } from 'src/constants';

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
import { Employee } from './types';

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
      const response = await editResourceRequest(ApiRoutes.EMPLOYEE, options);
      if (!response.error) {
        return dispatch(editEmployeeSuccess(response.data, options.id));
      }
      dispatch(setLoaderOff());
    } catch (error) {
      dispatch(editEmployeeError({ message: error.message, networkError: error.networkError }));
      dispatch(setLoaderOff());
    }
  };
};
