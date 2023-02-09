import { Reducer } from 'react';

import { Actions } from './constants';
import { ActionsType, Notification, NotificationState } from './types';

const initialState: NotificationState = {
  list: [],
  isLoading: false,
  error: undefined,
  selectedNotification: {} as Notification,
};

const notificationReducer: Reducer<NotificationState, ActionsType> = (
  state = initialState,
  action,
): NotificationState => {
  switch (action.type) {
    case Actions.GET_NOTIFICATIONS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false,
      };
    case Actions.GET_NOTIFICATIONS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: { ...action.payload },
      };
    case Actions.ADD_NOTIFICATION_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.ADD_NOTIFICATION_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false,
        error: undefined,
      };
    case Actions.ADD_NOTIFICATION_ERROR:
      return {
        ...state,
        error: { ...action.payload },
        isLoading: false,
      };
    case Actions.DELETE_NOTIFICATION_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.DELETE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        list: state.list.filter((notification) => notification._id !== action.payload),
        isLoading: false,
        error: undefined,
      };
    case Actions.DELETE_NOTIFICATION_ERROR:
      return {
        ...state,
        error: { ...action.payload },
        isLoading: false,
      };
    case Actions.CLEAN_SELECTED_NOTIFICATION:
      return {
        ...state,
        selectedNotification: {} as Notification,
      };
    default:
      return state;
  }
};

export default notificationReducer;
