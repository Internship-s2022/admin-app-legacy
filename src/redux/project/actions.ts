import { action } from 'typesafe-actions';

import { ErrorFormat } from 'src/redux/types';

import { Actions } from './constants';
import { Project } from './types';
export const getProjectsPending = () => action(Actions.GET_PROJECTS_PENDING);

export const getProjectsSuccess = (projects: Project[]) =>
  action(Actions.GET_PROJECTS_SUCCESS, projects);

export const getProjectsError = (error: ErrorFormat) => action(Actions.GET_PROJECTS_ERROR, error);

export const createProjectPending = () => action(Actions.CREATE_PROJECT_PENDING);

export const createProjectSuccess = (project: Project) =>
  action(Actions.CREATE_PROJECT_SUCCESS, project);

export const createProjectError = (error: ErrorFormat) =>
  action(Actions.CREATE_PROJECT_ERROR, error);

export const editProjectPending = () => action(Actions.EDIT_PROJECT_PENDING);

export const editProjectSuccess = (project: Project, id: string) =>
  action(Actions.EDIT_PROJECT_SUCCESS, { project, id });

export const editProjectError = (error: ErrorFormat) => action(Actions.EDIT_PROJECT_ERROR, error);

export const getProjectByIdPending = () => action(Actions.GET_PROJECT_BY_ID_PENDING);

export const getProjectByIdSuccess = (project: Project) =>
  action(Actions.GET_PROJECT_BY_ID_SUCCESS, project);

export const getProjectByIdError = (error: ErrorFormat) =>
  action(Actions.GET_PROJECT_BY_ID_ERROR, error);

export const cleanSelectedProject = () => action(Actions.CLEAN_SELECTED_PROJECT);
