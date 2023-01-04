import { Reducer } from 'redux';

import { Actions } from './constants';
import { ActionsType, Employee, EmployeeState } from './types';

const initialState: EmployeeState = {
  list: [],
  isLoading: false,
  error: undefined,
  selectedEmployee: {} as Employee,
};

const employeeReducer: Reducer<EmployeeState, ActionsType> = (
  state = initialState,
  action,
): EmployeeState => {
  switch (action.type) {
    case Actions.GET_EMPLOYEE_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.GET_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload,
      };
    case Actions.GET_EMPLOYEE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: { ...action.payload },
      };
    case Actions.GET_EMPLOYEE_BY_ID_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.GET_EMPLOYEE_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selectedEmployee: action.payload,
        error: undefined,
      };
    case Actions.GET_EMPLOYEE_BY_ID_ERROR:
      return {
        ...state,
        isLoading: false,
        error: { ...action.payload },
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
        error: undefined,
      };
    case Actions.EDIT_EMPLOYEE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: { ...action.payload },
      };
    case Actions.SET_SELECTED_EMPLOYEE:
      return {
        ...state,
        selectedEmployee: action.payload,
      };

    default:
      return state;
  }
};

export default employeeReducer;
