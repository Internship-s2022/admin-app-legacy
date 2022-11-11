import { Dispatch } from 'redux';

import { addResourceRequest, editResourceRequest, getResourceRequest } from 'src/config/api';
import { ApiRoutes } from 'src/constants';

import { setLoaderOff, setLoaderOn } from '../ui/actions';
import {
  createProjectError,
  createProjectPending,
  createProjectSuccess,
  editProjectError,
  editProjectPending,
  editProjectSuccess,
  getProjectsError,
  getProjectsPending,
  getProjectsSuccess,
} from './actions';
import { AppThunk, Project } from './types';

export const getProjects: AppThunk = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getProjectsPending());
      dispatch(setLoaderOn());
      const response = await getResourceRequest(ApiRoutes.PROJECTS);
      if (response.data?.length) {
        dispatch(getProjectsSuccess(response.data));
        dispatch(setLoaderOff());
      }
    } catch (error: any) {
      dispatch(getProjectsError({ message: error.message, networkError: error.networkError }));
      dispatch(setLoaderOff());
    }
  };
};

export const createProject: AppThunk = (data) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(createProjectPending());
      dispatch(setLoaderOn());
      const response = await addResourceRequest(ApiRoutes.PROJECTS, data);
      if (!response.error) {
        dispatch(createProjectSuccess(response.data));
      }
      dispatch(setLoaderOff());
    } catch (error) {
      dispatch(createProjectError({ message: error.message, networkError: error.networkError }));
      dispatch(setLoaderOff());
    }
  };
};

export const editProject: AppThunk = (options: { id: string; body: Project }) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(editProjectPending());
      dispatch(setLoaderOn());
      const response = await editResourceRequest(ApiRoutes.PROJECTS, options);
      if (response.error) {
        dispatch(editProjectSuccess(response.data, options.id));
      }
      dispatch(setLoaderOff());
    } catch (error) {
      dispatch(editProjectError({ message: error.message, networkError: error.networkError }));
      dispatch(setLoaderOff());
    }
  };
};
