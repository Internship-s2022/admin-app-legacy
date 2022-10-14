import { Reducer } from 'react';

import { Actions } from './constants';
import { ActionsType, State } from './types';

const initialState: State = {
  projects: [],
  isLoading: false,
  error: undefined,
};

const projectReducer: Reducer<State, ActionsType> = (state = initialState, action): State => {
  switch (action.type) {
    case Actions.GET_PROJECTS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.GET_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload,
        isLoading: false,
      };
    case Actions.GET_PROJECTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case Actions.ADD_PROJECT_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.ADD_PROJECT_SUCCESS:
      return {
        ...state,
        projects: [...state.projects, action.payload],
        isLoading: false,
        error: undefined,
      };
    case Actions.ADD_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case Actions.EDIT_PROJECT_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.EDIT_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project._id === action.payload._id) {
            return action.payload;
          }
          return project;
        }),
        isLoading: false,
        error: undefined,
      };
    case Actions.EDIT_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case Actions.DELETE_PROJECT_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.filter((project) => {
          project._id !== action.payload;
        }),
        isLoading: false,
        error: undefined,
      };
    case Actions.DELETE_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default projectReducer;
