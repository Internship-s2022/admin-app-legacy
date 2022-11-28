import { Dispatch } from 'redux';

import { editResourceRequest, getResourceRequest } from 'src/config/api';
import { ApiRoutes } from 'src/constants';

import { AppThunk } from '../types';
import { setLoaderOff, setLoaderOn, setOpenMessageAlert } from '../ui/actions';
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
    dispatch(getEmployeePending());
    dispatch(setLoaderOn());
    try {
      const response = await getResourceRequest(ApiRoutes.EMPLOYEE);
      if (response.data?.length) {
        dispatch(getEmployeeSuccess(response.data));
      }
    } catch (error) {
      dispatch(getEmployeeError({ message: error.message, networkError: error.networkError }));
    } finally {
      dispatch(setLoaderOff());
    }
  };
};

export const editEmployee: AppThunk = (options: { body: Employee; id: string }) => {
  return async (dispatch: Dispatch) => {
    dispatch(editEmployeePending());
    dispatch(setLoaderOn());
    try {
      const response = await editResourceRequest(ApiRoutes.EMPLOYEE, options);
      if (!response.error) {
        return dispatch(editEmployeeSuccess(response.data, options.id));
      }
    } catch (error) {
      dispatch(editEmployeeError({ message: error.message, networkError: error.networkError }));
    } finally {
      dispatch(setLoaderOff());
      dispatch(setOpenMessageAlert());
    }
  };
};
