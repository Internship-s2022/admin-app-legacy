import { Dispatch } from 'redux';

import { addResourceRequest, deleteResourceRequest } from 'src/config/api';
import { ApiRoutes } from 'src/constants';
import { AppThunk } from 'src/redux/types';

import { setLoaderOff, setLoaderOn, setOpenMessageAlert } from '../ui/actions';
import {
  addMemberError,
  addMemberPending,
  addMemberSuccess,
  deleteMemberError,
  deleteMemberPending,
  deleteMemberSuccess,
} from './actions';

export const addMember: AppThunk = (data) => {
  return async (dispatch: Dispatch) => {
    dispatch(addMemberPending());
    dispatch(setLoaderOn());
    try {
      const response = await addResourceRequest(ApiRoutes.MEMBER, data);
      if (!response.error) {
        dispatch(addMemberSuccess(response.data));
      }
    } catch (error) {
      dispatch(addMemberError({ message: error.message, networkError: error.networkError }));
    } finally {
      dispatch(setLoaderOff());
      dispatch(setOpenMessageAlert());
    }
  };
};

export const deleteMember: AppThunk = (id) => {
  return async (dispatch: Dispatch) => {
    dispatch(deleteMemberPending());
    dispatch(setLoaderOn());
    try {
      const response = await deleteResourceRequest(ApiRoutes.MEMBER, id);
      if (!response.error) {
        dispatch(deleteMemberSuccess(id));
      }
    } catch (error) {
      dispatch(deleteMemberError({ message: error.message, networkError: error.networkError }));
    } finally {
      dispatch(setLoaderOff());
      dispatch(setOpenMessageAlert());
    }
  };
};
