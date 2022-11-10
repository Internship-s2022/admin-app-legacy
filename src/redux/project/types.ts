import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import { RootState } from '../store';
import * as actions from './actions';

interface Client {
  _id: string;
  name: string;
}
export interface Project {
  _id?: string;
  clientName: Client;
  projectName: string;
  description: string;
  notes: string;
  startDate: Date;
  endDate: Date;
  members: string[];
  isCritic: string;
  isUpdated: boolean;
  projectType: string;
  isActive: boolean;
}

export type ActionsType = ActionType<typeof actions>;
export type AppThunk = ActionCreator<ThunkAction<void, RootState, null, Action<null>>>;
