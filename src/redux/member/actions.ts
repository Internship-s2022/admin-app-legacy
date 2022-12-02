import { action } from 'typesafe-actions';

import { ErrorFormat } from 'src/redux/types';

import { Actions } from './constants';
import { Member } from './types';

export const getMembersPending = () => action(Actions.GET_MEMBERS_PENDING);

export const getMembersError = (error: ErrorFormat) => action(Actions.GET_MEMBERS_ERROR, error);

export const getMembersSuccess = (members: Member[]) =>
  action(Actions.GET_MEMBERS_SUCCESS, members);

export const addMemberPending = () => action(Actions.ADD_MEMBER_PENDING);

export const addMemberError = (error: ErrorFormat) => action(Actions.ADD_MEMBER_ERROR, error);

export const addMemberSuccess = (member: Member) => action(Actions.ADD_MEMBER_SUCCESS, member);

export const editMemberPending = () => action(Actions.EDIT_MEMBER_PENDING);

export const editMemberError = (error: ErrorFormat) => action(Actions.EDIT_MEMBER_ERROR, error);

export const editMemberSuccess = (member: Member, id: string) =>
  action(Actions.EDIT_MEMBER_SUCCESS, { member, id });

export const deleteMemberPending = () => action(Actions.DELETE_MEMBER_PENDING);

export const deleteMemberError = (error: ErrorFormat) => action(Actions.DELETE_MEMBER_ERROR, error);

export const deleteMemberSuccess = (id: string) => action(Actions.DELETE_MEMBER_SUCCESS, id);
