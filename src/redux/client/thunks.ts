import { Dispatch } from 'redux';

import { AppThunk } from 'src/redux/types';

import { getClientsError, getClientsPending, getClientsSuccess } from './actions';
import { getClientsRequest } from './api';

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
