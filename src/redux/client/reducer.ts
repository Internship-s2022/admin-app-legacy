import { Reducer } from 'redux';

import { Actions } from './constants';
import { ActionsType, Client, ClientState } from './types';

const initialState: ClientState = {
  list: [],
  isLoading: false,
  error: undefined,
  selectedClient: {} as Client,
};

const clientReducer: Reducer<ClientState, ActionsType> = (
  state = initialState,
  action,
): ClientState => {
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
    case Actions.GET_CLIENT_BY_ID_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.GET_CLIENT_BY_ID_SUCCESS:
      return {
        ...state,
        selectedClient: action.payload,
        error: undefined,
      };
    case Actions.GET_CLIENT_BY_ID_ERROR:
      return {
        ...state,
        error: { ...action.payload },
        isLoading: false,
      };
    case Actions.ADD_CLIENT_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.ADD_CLIENT_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false,
        error: undefined,
      };
    case Actions.ADD_CLIENT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: { ...action.payload },
      };
    case Actions.EDIT_CLIENT_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.EDIT_CLIENT_SUCCESS:
      return {
        ...state,
        list: state.list.map((item) => {
          if (item._id === action.payload.id) {
            return { ...item, ...action.payload.client };
          }
          return item;
        }),
        error: undefined,
      };
    case Actions.EDIT_CLIENT_ERROR:
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
        list: state.list.filter((client) => client._id !== action.payload),
        isLoading: false,
        error: undefined,
      };
    case Actions.DELETE_CLIENT_ERROR:
      return {
        ...state,
        error: { ...action.payload },
        isLoading: false,
      };
    case Actions.CLEAR_SELECTED_CLIENT:
      return {
        ...state,
        selectedClient: {} as Client,
      };
    default:
      return state;
  }
};

export default clientReducer;
