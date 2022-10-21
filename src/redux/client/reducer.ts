import { Reducer } from 'redux';

import { Actions } from './constants';
import { ActionsType, State } from './types';

const initialState: State = {
  clients: [],
  isLoading: false,
  error: undefined,
};

const clientReducer: Reducer<State, ActionsType> = (state = initialState, action): State => {
  switch (action.type) {
    case Actions.GET_CLIENTS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.GET_CLIENTS_SUCCESS:
      return {
        ...state,
        clients: action.payload,
        isLoading: false,
        error: undefined,
      };
    case Actions.GET_CLIENTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default clientReducer;
