import { Reducer } from 'redux';

import { Actions } from './constants';
import { ActionsType, State } from './types';

const initialState: State = {
  authUser: { token: '', accessRoleType: '', name: '', email: '', photo: '', isActive: false },
  isLoading: true,
  error: undefined,
};

const authReducer: Reducer<State, ActionsType> = (state = initialState, action): State => {
  switch (action.type) {
    case Actions.LOGIN_PENDING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case Actions.LOGIN_SUCCESS:
      return {
        ...state,
        authUser: action.payload,
        isLoading: false,
      };
    case Actions.LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case Actions.SET_AUTHENTICATION:
      return {
        ...state,
        authUser: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
