import { Dispatch } from 'redux';

import {
  addResourceRequest,
  deleteResourceRequest,
  editResourceRequest,
  getByFilterResourceRequest,
  getResourceRequest,
} from 'src/config/api';
import { ApiRoutes } from 'src/constants';

import { getClientsPending, getClientsSuccess } from '../client/actions';
import { getMembersPending, getMembersSuccess } from '../member/actions';
import { AppThunk } from '../types';
import { setLoaderOff, setLoaderOn, setOpenMessageAlert } from '../ui/actions';
import {
  createProjectError,
  createProjectPending,
  createProjectSuccess,
  deleteProjectError,
  deleteProjectPending,
  deleteProjectSuccess,
  editProjectError,
  editProjectPending,
  editProjectSuccess,
  getProjectByIdError,
  getProjectByIdPending,
  getProjectByIdSuccess,
  getProjectsError,
  getProjectsPending,
  getProjectsSuccess,
} from './actions';
import { Project } from './types';

export const getProjects: AppThunk = () => {
  return async (dispatch: Dispatch) => {
    dispatch(getProjectsPending());
    dispatch(setLoaderOn());
    try {
      const response = await getResourceRequest(ApiRoutes.PROJECTS);
      if (response.data?.length) {
        dispatch(getProjectsSuccess(response.data));
      }
    } catch (error: any) {
      dispatch(getProjectsError({ message: error.message, errorType: error.errorType }));
    } finally {
      dispatch(setLoaderOff());
    }
  };
};

export const getProjectById: AppThunk = (id) => {
  return async (dispatch: Dispatch) => {
    dispatch(getProjectByIdPending());
    dispatch(setLoaderOn());
    try {
      const response = await getResourceRequest(`${ApiRoutes.PROJECTS}/${id}`);
      if (response.data) {
        dispatch(getProjectByIdSuccess(response.data));
      }
    } catch (error: any) {
      dispatch(getProjectByIdError({ message: error.message, errorType: error.errorType }));
    } finally {
      dispatch(setLoaderOff());
    }
  };
};

export const getProjectAndClients: AppThunk = (id) => {
  return async (dispatch: Dispatch) => {
    dispatch(getProjectByIdPending());
    dispatch(getClientsPending());
    dispatch(getMembersPending());
    dispatch(setLoaderOn());
    try {
      const responses = await Promise.all([
        getResourceRequest(ApiRoutes.CLIENT),
        id && getResourceRequest(`${ApiRoutes.PROJECTS}/${id}`),
        id && getByFilterResourceRequest(ApiRoutes.MEMBER, { project: id }),
      ]);

      responses[0].data?.length && dispatch(getClientsSuccess(responses[0].data));
      responses[1]?.data && dispatch(getProjectByIdSuccess(responses[1]?.data));
      responses[2]?.data && dispatch(getMembersSuccess(responses[2]?.data));
    } catch (error: any) {
      dispatch(getProjectByIdError({ message: error.message, errorType: error.errorType }));
    } finally {
      dispatch(setLoaderOff());
    }
  };
};

export const createProject: AppThunk = (data) => {
  return async (dispatch: Dispatch) => {
    dispatch(createProjectPending());
    dispatch(setLoaderOn());
    try {
      const response = await addResourceRequest(ApiRoutes.PROJECTS, data.body);
      if (!response.error) {
        return dispatch(createProjectSuccess(response.data));
      }
    } catch (error) {
      return dispatch(createProjectError({ message: error.message, errorType: error.errorType }));
    } finally {
      dispatch(setLoaderOff());
      dispatch(setOpenMessageAlert());
    }
  };
};

export const editProject: AppThunk = (options: { id: string; body: Project }) => {
  return async (dispatch: Dispatch) => {
    dispatch(editProjectPending());
    dispatch(setLoaderOn());
    try {
      const response = await editResourceRequest(ApiRoutes.PROJECTS, options);
      if (!response.error) {
        return dispatch(editProjectSuccess(response.data, options.id));
      }
    } catch (error) {
      return dispatch(editProjectError({ message: error.message, errorType: error.errorType }));
    } finally {
      dispatch(setLoaderOff());
      dispatch(setOpenMessageAlert());
    }
  };
};

export const deleteProject: AppThunk = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(deleteProjectPending());
    dispatch(setLoaderOn());
    try {
      const response = await deleteResourceRequest(ApiRoutes.PROJECTS, id);
      if (!response.error) {
        dispatch(deleteProjectSuccess(id));
      }
    } catch (error: any) {
      dispatch(deleteProjectError({ message: error.message, errorType: error.errorType }));
    } finally {
      dispatch(setLoaderOff());
      dispatch(setOpenMessageAlert());
    }
  };
};
