import { Reducer } from 'redux';

import { Actions } from './constants';
import { ActionsType, ClientState } from './types';

const initialState: ClientState = {
  list: [],
  isLoading: false,
  error: undefined,
  selectedClientId: '',
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
      console.log('action payload', action.payload);
      console.log(
        'filter',
        state.list.filter((client) => client._id !== action.payload),
      );
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
    case Actions.SET_SELECTED_CLIENT:
      return {
        ...state,
        selectedClientId: action.payload,
      };
    case Actions.CLEAR_DATA:
      return {
        ...state,
        selectedClientId: '',
      };
    default:
      return state;
  }
};

export default clientReducer;
