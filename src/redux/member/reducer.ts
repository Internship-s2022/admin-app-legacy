import { Reducer } from 'redux';

import { State } from '../types';
import { Actions } from './constants';
import { ActionsType, Member } from './types';

const initialState: State<Member> = {
  list: [],
  isLoading: false,
  error: undefined,
};

const memberReducer: Reducer<State<Member>, ActionsType> = (
  state = initialState,
  action,
): State<Member> => {
  switch (action.type) {
    case Actions.GET_MEMBERS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.GET_MEMBERS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false,
        error: undefined,
      };
    case Actions.GET_MEMBERS_ERROR:
      return {
        ...state,
        error: { ...action.payload },
        isLoading: false,
      };
    case Actions.ADD_MEMBER_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.ADD_MEMBER_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false,
        error: undefined,
      };
    case Actions.ADD_MEMBER_ERROR:
      return {
        ...state,
        error: { ...action.payload },
        isLoading: false,
      };
    case Actions.EDIT_MEMBER_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.EDIT_MEMBER_SUCCESS:
      return {
        ...state,
        list: state.list.map((item) => {
          if (item._id === action.payload.id) {
            return action.payload.member;
          }
          return item;
        }),
        isLoading: false,
        error: undefined,
      };
    case Actions.EDIT_MEMBER_ERROR:
      return {
        ...state,
        error: { ...action.payload },
        isLoading: false,
      };
    case Actions.DELETE_MEMBER_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.DELETE_MEMBER_SUCCESS:
      return {
        ...state,
        list: state.list.filter((member) => member._id !== action.payload),
        isLoading: false,
        error: undefined,
      };
    case Actions.DELETE_MEMBER_ERROR:
      return {
        ...state,
        error: { ...action.payload },
        isLoading: false,
      };
    default:
      return state;
  }
};

export default memberReducer;
