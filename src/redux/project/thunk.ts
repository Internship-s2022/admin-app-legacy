import { Dispatch } from 'redux';

import { getProjectsError, getProjectsPending, getProjectsSuccess } from './actions';
import { getProjectsRequest } from './api';
import { AppThunk } from './types';

export const getProjects: AppThunk = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getProjectsPending());
      const response = await getProjectsRequest();
      if (response.data?.length) {
        dispatch(getProjectsSuccess(response.data));
      }
    } catch (error: any) {
      if (error.code !== 'ERR_NETWORK') {
        dispatch(getProjectsError(error.response.data.message));
      } else {
        dispatch(getProjectsError(error.message));
      }
    }
  };
};
