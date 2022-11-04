import { Reducer } from 'redux';

import { Actions } from './constants';
import { ActionsType, State } from './types';

const initialState: State = {
  list: [],
  isLoading: false,
  error: undefined,
};

const employeeReducer: Reducer<State, ActionsType> = (state = initialState, action): State => {
  switch (action.type) {
    case Actions.GET_EMPLOYEE_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.GET_EMPLOYEE_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false,
        error: undefined,
      };
    case Actions.GET_EMPLOYEE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case Actions.EDIT_EMPLOYEE_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.EDIT_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: state.list.map((item) => {
          if (item._id === action.payload.id) {
            return { ...item, ...action.payload.body };
          }
          return item;
        }),
      };
    case Actions.EDIT_EMPLOYEE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default employeeReducer;
