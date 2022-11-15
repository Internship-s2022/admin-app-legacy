import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import { Criticality, ProjectType } from 'src/components/pages/projects/types';
import { State } from 'src/redux/types';

import { RootState } from '../store';
import * as actions from './actions';

interface Client {
  _id: string;
  name: string;
}
export interface Project {
  isCritic: Criticality;
  _id?: string;
  clientName: Client;
  projectName: string;
  description: string;
  notes: string;
  startDate: Date;
  endDate: Date;
  members: string[];
  isUpdated: boolean;
  projectType: ProjectType;
  isActive: boolean;
}

export interface ProjectState extends State<Project> {
  selectedProject?: Project;
}

export type ActionsType = ActionType<typeof actions>;
export type AppThunk = ActionCreator<ThunkAction<void, RootState, null, Action<null>>>;
