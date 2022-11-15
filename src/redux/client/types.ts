import { ActionType } from 'typesafe-actions';

import { ContactData, Project } from 'src/components/pages/clients/types';

import { State } from '../types';
import * as actions from './actions';
export interface Client {
  _id: string;
  firebaseUid?: string;
  name: string;
  localContact: ContactData;
  clientContact: ContactData;
  projects?: Project[];
  relationshipStart?: Date;
  relationshipEnd?: Date;
  notes?: string;
  isActive: boolean;
}

export interface ClientState extends State<Client> {
  selectedClient: Client;
}

export type ActionsType = ActionType<typeof actions>;
