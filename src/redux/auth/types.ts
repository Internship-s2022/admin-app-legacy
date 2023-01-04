import { ActionType } from 'typesafe-actions';

import { UserData } from 'src/components/pages/users/types';

import * as actions from './actions';

export interface AuthUser extends UserData {
  token: string;
  isActive: boolean;
}

export interface State {
  authUser: AuthUser;
  isLoading: boolean;
  error: string;
}

export type ActionsType = ActionType<typeof actions>;
