import { Reducer } from 'redux';

import { Actions } from './constants';
import { ActionsType, State } from './types';

const initialState: State = {
  employees: [],
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
        employees: action.payload,
        isLoading: false,
        error: undefined,
      };
    case Actions.GET_EMPLOYEE_ERROR:
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
