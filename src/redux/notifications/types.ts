import { ActionType } from 'typesafe-actions';

import { State } from 'src/redux/types';

import { Client } from '../client/types';
import { Employee } from '../employee/types';
import { Project } from '../project/types';
import * as actions from './actions';

export interface Notification {
  _id: string;
  notificationType: string;
  employee?: Employee;
  project?: Project;
  client?: Client;
  limitDate?: Date;
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
