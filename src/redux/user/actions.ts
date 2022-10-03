import { action } from 'typesafe-actions';

import { Actions } from './constants';
import { User } from './types';

export const getUsersSuccess = (users: User[]) => action(Actions.GET_USERS_SUCCESS, users);

export const getUsersPending = () => action(Actions.GET_USERS_PENDING);

export const getUsersError = (error: string) => action(Actions.GET_USERS_ERROR, error);
