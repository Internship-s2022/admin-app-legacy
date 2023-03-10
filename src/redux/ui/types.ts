import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import { RootState } from '../store';
import * as actions from './actions';

export interface State {
  isLoading: boolean;
  showModal: boolean;
  showFormModal: boolean;
  showConfirmModal: boolean;
  showLogoutModal: boolean;
  showSuccessErrorAlert: boolean;
  snackbarOperation: string;
}

export type ActionsType = ActionType<typeof actions>;
export type AppThunk = ActionCreator<ThunkAction<void, RootState, null, Action<null>>>;
