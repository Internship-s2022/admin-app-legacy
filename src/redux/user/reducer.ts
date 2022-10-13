import { Reducer } from 'redux';

import { Actions } from './constants';
import { ActionsType, State } from './types';

const initialState: State = {
  users: [],
  isLoading: false,
  error: undefined,
};

const userReducer: Reducer<State, ActionsType> = (state = initialState, action): State => {
  switch (action.type) {
    case Actions.GET_USERS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        isLoading: false,
        error: undefined,
      };
    case Actions.GET_USERS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case Actions.ADD_USER_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.ADD_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
        isLoading: false,
        error: undefined,
      };
    case Actions.ADD_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case Actions.EDIT_USER_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.EDIT_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map((item) => {
          if (item._id === action.payload.id) {
            return { ...item, accessRoleType: action.payload.accessRole };
          }
          return item;
        }),
        isLoading: false,
      };
    case Actions.EDIT_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case Actions.DELETE_USER_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: state.users.filter((user) => user._id !== action.payload),
        error: undefined,
      };
    case Actions.DELETE_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
