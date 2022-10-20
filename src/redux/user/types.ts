import { ActionType } from 'typesafe-actions';

import * as actions from './actions';

export interface User {
  _id?: string;
  firebaseUid?: string;
  accessRoleType?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  location?: string;
  workedHours?: number;
  isActive?: boolean;
}

export interface State {
  list: User[];
  isLoading: boolean;
  error: string;
}

export type ActionsType = ActionType<typeof actions>;
