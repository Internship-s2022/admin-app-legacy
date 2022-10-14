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
      dispatch(getProjectsError(error));
    }
  };
};
