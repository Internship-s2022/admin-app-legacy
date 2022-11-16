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
    default:
      return state;
  }
};

export default memberReducer;
