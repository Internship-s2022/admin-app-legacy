import { Dispatch } from 'redux';

import { getClientsError, getClientsPending, getClientsSuccess } from './actions';
import { getClientsRequest } from './api';
import { AppThunk } from './types';

export const getClients: AppThunk = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getClientsPending());
      const response = await getClientsRequest();
      if (response.data?.length) {
        return dispatch(getClientsSuccess(response.data));
      }
    } catch (error) {
      dispatch(getClientsError(error));
    }
  };
};
