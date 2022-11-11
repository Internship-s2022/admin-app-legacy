import { Reducer } from 'redux';

import { Client } from 'src/redux/client/types';
import { State } from 'src/redux/types';

import { Actions } from './constants';
import { ActionsType } from './types';

const initialState: State<Client> = {
  list: [],
  isLoading: false,
  error: undefined,
};

const clientReducer: Reducer<State<Client>, ActionsType> = (
  state = initialState,
  action,
): State<Client> => {
  switch (action.type) {
    case Actions.GET_CLIENTS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.GET_CLIENTS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false,
        error: undefined,
      };
    case Actions.GET_CLIENTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: { ...action.payload },
      };
    case Actions.DELETE_CLIENT_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.DELETE_CLIENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((client) => client._id !== action.payload),
        error: undefined,
      };
    case Actions.DELETE_CLIENT_ERROR:
      return {
        ...state,
        error: { ...action.payload },
        isLoading: false,
      };
    default:
      return state;
  }
};

export default clientReducer;
