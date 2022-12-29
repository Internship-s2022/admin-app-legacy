import { Reducer } from 'react';

import { Actions } from './constants';
import { ActionsType, State } from './types';

const initialState: State = {
  isLoading: false,
  showModal: false,
  showFormModal: false,
  showConfirmModal: false,
  showLogoutModal: false,
  showSuccessErrorAlert: false,
  snackbarOperation: '',
};

const uiReducer: Reducer<State, ActionsType> = (state = initialState, action): State => {
  switch (action.type) {
    case Actions.SET_LOADER_ON:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.SET_LOADER_OFF:
      return {
        ...state,
        isLoading: false,
      };
    case Actions.OPEN_MODAL:
      return {
        ...state,
        showModal: true,
      };
    case Actions.CLOSE_MODAL:
      return {
        ...state,
        showModal: false,
      };
    case Actions.OPEN_FORM_MODAL:
      return {
        ...state,
        showFormModal: true,
      };
    case Actions.CLOSE_FORM_MODAL:
      return {
        ...state,
        showFormModal: false,
      };
    case Actions.OPEN_CONFIRMATION_MODAL:
      return {
        ...state,
        showConfirmModal: true,
      };
    case Actions.CLOSE_CONFIRMATION_MODAL:
      return {
        ...state,
        showConfirmModal: false,
      };
    case Actions.OPEN_LOGOUT_MODAL:
      return {
        ...state,
        showLogoutModal: true,
      };
    case Actions.CLOSE_LOGOUT_MODAL:
      return {
        ...state,
        showLogoutModal: false,
      };

    case Actions.SET_OPEN_MESSAGE_ALERT:
      return {
        ...state,
        showSuccessErrorAlert: true,
      };
    case Actions.CLOSE_MESSAGE_ALERT:
      return {
        ...state,
        showSuccessErrorAlert: false,
      };
    case Actions.SET_SNACKBAR_OPERATION:
      return {
        ...state,
        snackbarOperation: action.payload,
      };
    case Actions.CLEAN_SNACKBAR_OPERATION:
      return {
        ...state,
        snackbarOperation: '',
      };
    default:
      return state;
  }
};

export default uiReducer;
