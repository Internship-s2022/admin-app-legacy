import { action } from 'typesafe-actions';

import { ErrorFormat } from 'src/redux/types';

import { Actions } from './constants';
import { Notification } from './types';

export const getNotificationsPending = () => action(Actions.GET_NOTIFICATIONS_PENDING);

export const getNotificationsSuccess = (notifications: Notification[]) =>
  action(Actions.GET_NOTIFICATIONS_SUCCESS, notifications);

export const getNotificationsError = (error: ErrorFormat) =>
  action(Actions.GET_NOTIFICATIONS_ERROR, error);

export const createNotificationPending = () => action(Actions.ADD_NOTIFICATION_PENDING);

export const createNotificationSuccess = (notification: Notification) =>
  action(Actions.ADD_NOTIFICATION_SUCCESS, notification);

export const createNotificationError = (error: ErrorFormat) =>
  action(Actions.ADD_NOTIFICATION_ERROR, error);

export const deleteNotificationPending = () => action(Actions.DELETE_NOTIFICATION_PENDING);

export const deleteNotificationSuccess = (id: string) =>
  action(Actions.DELETE_NOTIFICATION_SUCCESS, id);

export const deleteNotificationError = (error: ErrorFormat) =>
  action(Actions.DELETE_NOTIFICATION_ERROR, error);

export const cleanSelectedNotification = () => action(Actions.CLEAN_SELECTED_NOTIFICATION);
