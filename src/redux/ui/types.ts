import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import { RootState } from '../store';
import * as actions from './actions';

export interface State {
  isLoading: boolean;
  showModal: boolean;
  showFormModal: boolean;
}

export type ActionsType = ActionType<typeof actions>;
export type AppThunk = ActionCreator<ThunkAction<void, RootState, null, Action<null>>>;
