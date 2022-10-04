import { action } from 'typesafe-actions';

import { Actions } from './constants';
import { User } from './types';

export const getUsersPending = () => action(Actions.GET_USERS_PENDING);

export const getUsersSuccess = (users: User[]) => action(Actions.GET_USERS_SUCCESS, users);

export const getUsersError = (error: string) => action(Actions.GET_USERS_ERROR, error);

export const addUserPending = () => action(Actions.ADD_USER_PENDING);

export const addUserSuccess = (user: User) => action(Actions.ADD_USER_SUCCESS, user);

export const addUsersError = (error: string) => action(Actions.ADD_USER_ERROR, error);

export const editUserSuccess = (user: User) => action(Actions.EDIT_USER_SUCCESS, user);

export const editUserPending = () => action(Actions.EDIT_USER_PENDING);

export const editUserError = (error: string) => action(Actions.EDIT_USER_ERROR, error);
