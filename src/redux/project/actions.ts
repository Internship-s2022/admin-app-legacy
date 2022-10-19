import { action } from 'typesafe-actions';

import { Actions } from './constants';
import { Project } from './types';

export const getProjectsPending = () => action(Actions.GET_PROJECTS_PENDING);

export const getProjectsSuccess = (projects: Project[]) =>
  action(Actions.GET_PROJECTS_SUCCESS, projects);

export const getProjectsError = (error: string) => action(Actions.GET_PROJECTS_ERROR, error);
