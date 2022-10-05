/* eslint-disable no-case-declarations */
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
    case Actions.ADD_USER_PENDING:
      return {
        ...state,
        isPending: true,
      };
    case Actions.ADD_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
        isPending: false,
      };
    case Actions.ADD_USER_ERROR:
      return {
        ...state,
        isPending: false,
        error: action.payload,
      };
    case Actions.EDIT_USER_PENDING:
      return {
        ...state,
        isPending: true,
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
        isPending: false,
      };
    case Actions.EDIT_USER_ERROR:
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
