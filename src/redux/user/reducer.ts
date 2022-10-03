import { Reducer } from 'redux';

import { Actions } from './constants';
import { ActionsType, State } from './types';

const initialState: State = {
  users: [],
  isPending: false,
  error: undefined,
};

const userReducer: Reducer<State, ActionsType> = (state = initialState, action): State => {
  switch (action.type) {
    case Actions.GET_USERS_PENDING:
      return {
        ...state,
        isPending: true,
      };
    case Actions.GET_USERS_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        users: action.payload,
        isPending: false,
        error: undefined,
      };
    case Actions.GET_USERS_ERROR:
      return {
        ...state,
        isPending: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
