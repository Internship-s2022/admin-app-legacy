import { Dispatch } from 'redux';

import { editResourceRequest, getResourceRequest } from 'src/config/api';
import { ApiRoutes } from 'src/constants';

import { AppThunk } from '../types';
import { setLoaderOff, setLoaderOn, setOpenMessageAlert } from '../ui/actions';
import {
  editEmployeeError,
  editEmployeePending,
  editEmployeeSuccess,
  getEmployeeByIdError,
  getEmployeeByIdPending,
  getEmployeeByIdSuccess,
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
      dispatch(getEmployeeError({ message: error.message, errorType: error.errorType }));
    } finally {
      dispatch(setLoaderOff());
    }
  };
};

export const getEmployeeById: AppThunk = (id) => {
  return async (dispatch: Dispatch) => {
    dispatch(getEmployeeByIdPending());
    dispatch(setLoaderOn());
    try {
      const response = await getResourceRequest(`${ApiRoutes.EMPLOYEE}/${id}`);
      if (response.data) {
        dispatch(getEmployeeByIdSuccess(response.data));
      }
    } catch (error) {
      dispatch(getEmployeeByIdError({ message: error.message, errorType: error.errorType }));
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
      dispatch(editEmployeeError({ message: error.message, errorType: error.errorType }));
    } finally {
      dispatch(setLoaderOff());
      dispatch(setOpenMessageAlert());
    }
  };
};
