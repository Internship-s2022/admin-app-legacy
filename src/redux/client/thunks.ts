import { Dispatch } from 'redux';

import { AppThunk } from 'src/redux/types';

import { setLoaderOff, setLoaderOn } from '../ui/actions';
import { getClientsError, getClientsPending, getClientsSuccess } from './actions';
import { getClientsRequest } from './api';

export const getClients: AppThunk = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getClientsPending());
      dispatch(setLoaderOn());
      const response = await getClientsRequest();
      if (response.data?.length) {
        dispatch(getClientsSuccess(response.data));
        dispatch(setLoaderOff());
      }
    } catch (error) {
      if (error.code !== 'ERR_NETWORK') {
        dispatch(getClientsError({ message: error.response.data.message, networkError: false }));
        dispatch(setLoaderOff());
      } else {
        dispatch(getClientsError({ message: error.message, networkError: true }));
        dispatch(setLoaderOff());
      }
    }
  };
};
