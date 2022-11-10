import { Reducer } from 'react';

import { State } from 'src/redux/types';

import { Actions } from './constants';
import { ActionsType, Project } from './types';

const initialState: State<Project> = {
  list: [],
  isLoading: false,
  error: undefined,
};

const projectReducer: Reducer<State<Project>, ActionsType> = (
  state = initialState,
  action,
): State<Project> => {
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
    default:
      return state;
  }
};

export default projectReducer;
