import { Reducer } from 'redux';

import { State } from 'src/redux/types';

import { Actions } from './constants';
import { ActionsType, User } from './types';

const initialState: State<User> = {
  list: [],
  isLoading: false,
  error: undefined,
};

const userReducer: Reducer<State<User>, ActionsType> = (
  state = initialState,
  action,
): State<User> => {
  switch (action.type) {
    case Actions.GET_USERS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.GET_USERS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false,
      };
    case Actions.GET_USERS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: { ...action.payload },
      };
    case Actions.ADD_USER_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.ADD_USER_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false,
        error: undefined,
      };
    case Actions.ADD_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: { ...action.payload },
      };
    case Actions.EDIT_USER_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.EDIT_USER_SUCCESS:
      return {
        ...state,
        list: state.list.map((item) => {
          if (item._id === action.payload.id) {
            return { ...action.payload.response };
          }
          return item;
        }),
        isLoading: false,
        error: undefined,
      };
    case Actions.EDIT_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: { ...action.payload },
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
        list: state.list.map((user) => {
          if (user._id === action.payload) {
            return {
              ...user,
              isActive: false,
            };
          }
          return user;
        }),
        error: undefined,
      };
    case Actions.DELETE_USER_ERROR:
      return {
        ...state,
        error: { ...action.payload },
        isLoading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
