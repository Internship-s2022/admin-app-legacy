import { ActionType } from 'typesafe-actions';

import { Project } from 'src/components/pages/clients/types';
import { State } from 'src/redux/types';

import { Client } from '../client/types';
import { Employee } from '../employee/types';
import * as actions from './actions';

export interface Notification {
  _id: string;
  notificationType: string;
  employee?: Employee;
  project?: Project;
  client?: Client;
  date: Date;
  reasonType?: number;
  isChecked?: boolean;
  customMessage?: string;
  isCustom: boolean;
  isActive: boolean;
}

export interface NotificationState extends State<Notification> {
  selectedNotification?: Notification;
}

export type ActionsType = ActionType<typeof actions>;
