import { Reducer } from 'react';

import { Actions } from './constants';
import { ActionsType, ProjectState } from './types';

const initialState: ProjectState = {
  list: [],
  isLoading: false,
  error: undefined,
  selectedProject: {},
};

const projectReducer: Reducer<ProjectState, ActionsType> = (
  state = initialState,
  action,
): ProjectState => {
  switch (action.type) {
    case Actions.GET_PROJECTS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.GET_PROJECTS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false,
      };
    case Actions.GET_PROJECTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: { ...action.payload },
      };
    case Actions.CREATE_PROJECT_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false,
        error: undefined,
      };
    case Actions.CREATE_PROJECT_ERROR:
      return {
        ...state,
        error: { ...action.payload },
        isLoading: false,
      };
    case Actions.EDIT_PROJECT_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.EDIT_PROJECT_SUCCESS:
      return {
        ...state,
        list: state.list.map((project) => {
          if (project._id === action.payload.id) {
            return action.payload.project;
          }
          return project;
        }),
        isLoading: false,
      };
    case Actions.EDIT_PROJECT_ERROR:
      return {
        ...state,
        error: { ...action.payload },
        isLoading: false,
      };
    case Actions.GET_PROJECT_BY_ID_SUCCESS:
      console.log('action payload', action.payload);
      return {
        ...state,
        selectedProject: action.payload,
      };
    case Actions.GET_PROJECT_BY_ID_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.GET_PROJECT_BY_ID_ERROR:
      return {
        ...state,
        error: { ...action.payload },
        isLoading: false,
      };
    case Actions.CLEAN_SELECTED_PROJECT:
      return {
        ...state,
        selectedProject: {},
      };
    default:
      return state;
  }
};

export default projectReducer;
