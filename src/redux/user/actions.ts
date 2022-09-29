import { action } from 'typesafe-actions';

import { Actions, User } from './types';

export const getUsersSuccess = (user: User[]) => action(Actions.GET_USERS_SUCCESS, { user });

export const getUsersPending = () => action(Actions.GET_USERS_PENDING);

export const getUsersError = (error: string) => action(Actions.GET_USERS_ERROR, { error });
