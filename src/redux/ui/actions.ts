import { action } from 'typesafe-actions';

import { Actions } from './constants';

export const setLoaderOn = () => action(Actions.SET_LOADER_ON);
export const setLoaderOff = () => action(Actions.SET_LOADER_OFF);
export const openModal = () => action(Actions.OPEN_MODAL);
export const closeModal = () => action(Actions.CLOSE_MODAL);
export const openFormModal = () => action(Actions.OPEN_FORM_MODAL);
export const closeFormModal = () => action(Actions.CLOSE_FORM_MODAL);
export const openConfirmationModal = () => action(Actions.OPEN_CONFIRMATION_MODAL);
export const closeConfirmationModal = () => action(Actions.CLOSE_CONFIRMATION_MODAL);
export const openLogoutModal = () => action(Actions.OPEN_LOGOUT_MODAL);
export const closeLogoutModal = () => action(Actions.CLOSE_LOGOUT_MODAL);
export const showMessageModal = () => action(Actions.SHOW_MESSAGE_MODAL);
export const closeMessageModal = () => action(Actions.CLOSE_MESSAGE_MODAL);
