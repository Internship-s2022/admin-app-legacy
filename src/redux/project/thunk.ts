import { Dispatch } from 'redux';

import { getResourceRequest } from 'src/config/api';
import { ApiRoutes } from 'src/constants';

import { setLoaderOff, setLoaderOn } from '../ui/actions';
import { getProjectsError, getProjectsPending, getProjectsSuccess } from './actions';
import { AppThunk } from './types';

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
