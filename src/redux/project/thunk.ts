import { Dispatch } from 'redux';

import { setLoaderOff, setLoaderOn } from '../ui/actions';
import { getProjectsError, getProjectsPending, getProjectsSuccess } from './actions';
import { getProjectsRequest } from './api';
import { AppThunk } from './types';

export const getProjects: AppThunk = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getProjectsPending());
      dispatch(setLoaderOn());
      const response = await getProjectsRequest();
      if (response.data?.length) {
        dispatch(getProjectsSuccess(response.data));
        dispatch(setLoaderOff());
      }
    } catch (error: any) {
      if (error.code !== 'ERR_NETWORK') {
        dispatch(getProjectsError(error.response.data.message));
        dispatch(setLoaderOff());
      } else {
        dispatch(getProjectsError(error.message));
        dispatch(setLoaderOff());
      }
    }
  };
};
