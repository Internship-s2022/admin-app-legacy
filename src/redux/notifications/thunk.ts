import { Dispatch } from 'redux';

import { deleteResourceRequest, getResourceRequest } from 'src/config/api';
import { ApiRoutes } from 'src/constants';

import { AppThunk } from '../types';
import { setLoaderOff, setLoaderOn, setOpenMessageAlert } from '../ui/actions';
import {
  deleteNotificationError,
  deleteNotificationPending,
  deleteNotificationSuccess,
  getNotificationsError,
  getNotificationsPending,
  getNotificationsSuccess,
} from './actions';

export const getNotifications: AppThunk = () => {
  return async (dispatch: Dispatch) => {
    dispatch(getNotificationsPending());
    dispatch(setLoaderOn());
    try {
      const response = await getResourceRequest(ApiRoutes.NOTIFICATION);
      if (response.data?.length) {
        dispatch(getNotificationsSuccess(response.data));
      }
    } catch (error: any) {
      dispatch(getNotificationsError({ message: error.message, networkError: error.networkError }));
    } finally {
      dispatch(setLoaderOff());
    }
  };
};

export const deleteNotification: AppThunk = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(deleteNotificationPending());
    dispatch(setLoaderOn());
    try {
      const response = await deleteResourceRequest(ApiRoutes.NOTIFICATION, id);
      if (!response.error) {
        dispatch(deleteNotificationSuccess(id));
      }
    } catch (error: any) {
      dispatch(
        deleteNotificationError({ message: error.message, networkError: error.networkError }),
      );
    } finally {
      dispatch(setLoaderOff());
      dispatch(setOpenMessageAlert());
    }
  };
};
