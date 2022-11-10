import { Reducer } from 'redux';

import { Actions } from './constants';
import { ActionsType, State } from './types';

const initialState: State = {
  authUser: { token: '', accessRoleType: '', name: '', email: '', photo: '' },
  error: undefined,
};

const authReducer: Reducer<State, ActionsType> = (state = initialState, action): State => {
  switch (action.type) {
    case Actions.LOGIN_SUCCESS:
      return {
        ...state,
        authUser: action.payload,
      };
    case Actions.LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case Actions.SET_AUTHENTICATION:
      return {
        ...state,
        authUser: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
