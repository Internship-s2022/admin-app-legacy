import { action } from 'typesafe-actions';

import { ErrorFormat } from 'src/redux/types';

import { Actions } from './constants';
import { Project } from './types';

export const getProjectsPending = () => action(Actions.GET_PROJECTS_PENDING);

export const getProjectsSuccess = (projects: Project[]) =>
  action(Actions.GET_PROJECTS_SUCCESS, projects);

export const getProjectsError = (error: ErrorFormat) => action(Actions.GET_PROJECTS_ERROR, error);
