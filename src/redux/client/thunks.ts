import { Dispatch } from 'redux';

import { getResourceRequest } from 'src/config/api';
import { ApiRoutes } from 'src/constants';
import { AppThunk } from 'src/redux/types';

import { setLoaderOff, setLoaderOn } from '../ui/actions';
import { getClientsError, getClientsPending, getClientsSuccess } from './actions';

export const getClients: AppThunk = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getClientsPending());
      dispatch(setLoaderOn());
      const response = await getResourceRequest(ApiRoutes.CLIENT);
      if (response.data?.length) {
        dispatch(getClientsSuccess(response.data));
        dispatch(setLoaderOff());
      }
    } catch (error) {
      dispatch(getClientsError({ message: error.message, networkError: error.networkError }));
      dispatch(setLoaderOff());
    }
  };
};
