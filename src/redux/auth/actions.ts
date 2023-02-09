import { action } from 'typesafe-actions';

import { Actions } from './constants';
import { AuthUser } from './types';

export const setAuthentication = (user: AuthUser) => action(Actions.SET_AUTHENTICATION, user);
export const loginPending = () => action(Actions.LOGIN_PENDING);
export const loginSuccess = (user: AuthUser) => action(Actions.LOGIN_SUCCESS, user);
export const loginError = (error: string) => action(Actions.LOGIN_ERROR, error);
export const setAuthError = (authError: boolean) => action(Actions.SET_AUTH_ERROR, authError);
