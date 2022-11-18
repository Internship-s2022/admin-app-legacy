import { Dispatch } from 'redux';

import { addResourceRequest } from 'src/config/api';
import { ApiRoutes } from 'src/constants';
import { AppThunk } from 'src/redux/types';

import { setLoaderOff, setLoaderOn } from '../ui/actions';
import { addMemberError, addMemberPending, addMemberSuccess } from './actions';

export const addMember: AppThunk = (data) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(addMemberPending());
      dispatch(setLoaderOn());
      const response = await addResourceRequest(ApiRoutes.MEMBER, data);
      if (!response.error) {
        dispatch(addMemberSuccess(response.data));
      }
      dispatch(setLoaderOff());
    } catch (error) {
      dispatch(addMemberError({ message: error.message, networkError: error.networkError }));
      dispatch(setLoaderOff());
    }
  };
};
