import { Reducer } from 'react';

import { Actions } from './constants';
import { ActionsType, State } from './types';

const initialState: State = {
  isLoading: false,
  showModal: false,
  showFormModal: false,
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
    default:
      return state;
  }
};

export default uiReducer;
