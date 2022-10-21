import { ActionType } from 'typesafe-actions';

import { ContactData } from 'src/components/pages/clients/types';

import * as actions from './actions';
export interface Client {
  _id: string;
  firebaseUid?: string;
  name: string;
  localContact: ContactData;
  clientContact: ContactData;
  projects?: string[];
  relationshipStart?: Date;
  relationshipEnd?: Date;
  notes?: string;
  isActive: boolean;
}
export interface State {
  list: Client[];
  isLoading: boolean;
  error: string;
}

export type ActionsType = ActionType<typeof actions>;
