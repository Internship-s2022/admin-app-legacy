import { action } from 'typesafe-actions';

import { Actions } from './constants';
import { Project } from './types';

export const getProjectsPending = () => action(Actions.GET_PROJECTS_PENDING);

export const getProjectsSuccess = (projects: Project[]) =>
  action(Actions.GET_PROJECTS_SUCCESS, projects);

export const getProjectsError = (error: string) => action(Actions.GET_PROJECTS_ERROR, error);

export const addProjectPending = () => action(Actions.ADD_PROJECT_PENDING);

export const addProjectSuccess = (project: Project) => action(Actions.ADD_PROJECT_SUCCESS, project);

export const addProjectError = (error: string) => action(Actions.ADD_PROJECT_ERROR, error);

export const editProjectPending = () => action(Actions.EDIT_PROJECT_PENDING);

export const editProjectSuccess = (project: Project) =>
  action(Actions.EDIT_PROJECT_SUCCESS, project);

export const editProjectError = (error: string) => action(Actions.EDIT_PROJECT_ERROR, error);

export const deleteProjectPending = () => action(Actions.DELETE_PROJECT_PENDING);

export const deleteProjectSuccess = (id: string) => action(Actions.DELETE_PROJECT_SUCCESS, id);

export const deleteProjectError = (error: string) => action(Actions.DELETE_PROJECT_ERROR, error);
