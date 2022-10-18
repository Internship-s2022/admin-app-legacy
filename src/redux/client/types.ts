import { ActionType } from 'typesafe-actions';

import * as actions from './actions';

export interface Client {
  _id: string;
  firebaseUid?: string;
  name: string;
  localContact: string;
  clientContact: string;
  projects?: string[];
  relationshipStart?: Date;
  relationshipEnd?: Date;
  notes?: string;
  isActive: boolean;
}

export interface State {
  clients: Client[];
  isLoading: boolean;
  error: string;
}

export type ActionsType = ActionType<typeof actions>;
