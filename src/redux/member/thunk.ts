import { Dispatch } from 'redux';

import {
  addResourceRequest,
  deleteResourceRequest,
  editResourceRequest,
  getByFilterResourceRequest,
} from 'src/config/api';
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
  editMemberError,
  editMemberPending,
  editMemberSuccess,
  getMembersError,
  getMembersPending,
  getMembersSuccess,
} from './actions';
import { Member } from './types';

export const getMembers: AppThunk = (filter) => {
  return async (dispatch: Dispatch) => {
    dispatch(getMembersPending());
    try {
      const response = await getByFilterResourceRequest(ApiRoutes.MEMBER, filter);
      if (response?.data) {
        dispatch(getMembersSuccess(response.data));
      }
    } catch (error) {
      dispatch(getMembersError({ message: error.message, errorType: error.errorType }));
    }
  };
};

export const addMember: AppThunk = (data) => {
  return async (dispatch: Dispatch) => {
    dispatch(addMemberPending());
    try {
      const response = await addResourceRequest(ApiRoutes.MEMBER, data);
      if (!response.error) {
        dispatch(addMemberSuccess(response.data));
      }
    } catch (error) {
      dispatch(addMemberError({ message: error.message, errorType: error.errorType }));
    } finally {
      dispatch(setOpenMessageAlert());
    }
  };
};

export const editMember: AppThunk = (options: { id: string; body: Member }) => {
  return async (dispatch: Dispatch) => {
    dispatch(editMemberPending());
    dispatch(setLoaderOn());
    try {
      const response = await editResourceRequest(ApiRoutes.MEMBER, options);
      if (!response.error) {
        dispatch(editMemberSuccess(response.data, options.id));
      }
    } catch (error) {
      dispatch(editMemberError({ message: error.message, errorType: error.errorType }));
    } finally {
      dispatch(setLoaderOff());
      dispatch(setOpenMessageAlert());
    }
  };
};
export const deleteMember: AppThunk = (id) => {
  return async (dispatch: Dispatch) => {
    dispatch(deleteMemberPending());
    try {
      const response = await deleteResourceRequest(ApiRoutes.MEMBER, id);
      if (!response.error) {
        dispatch(deleteMemberSuccess(id));
      }
    } catch (error) {
      dispatch(deleteMemberError({ message: error.message, errorType: error.errorType }));
    } finally {
      dispatch(setOpenMessageAlert());
    }
  };
};
