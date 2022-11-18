import { action } from 'typesafe-actions';

import { ErrorFormat } from 'src/redux/types';

import { Actions } from './constants';
import { Member } from './types';

export const addMemberPending = () => action(Actions.ADD_MEMBER_PENDING);

export const addMemberError = (error: ErrorFormat) => action(Actions.ADD_MEMBER_ERROR, error);

export const addMemberSuccess = (member: Member) => action(Actions.ADD_MEMBER_SUCCESS, member);
