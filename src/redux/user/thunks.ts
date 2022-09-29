import { Dispatch } from 'redux';

import { getUsersError, getUsersPending, getUsersSuccess } from './actions';
import { ApiResponse, AppThunk, User } from './types';

// export const getUsers = () => {
//   return (dispatch: Dispatch) => {
//     dispatch(getUsersPending());
//     return fetch('localhost:4000/user')
//       .then((response) => response.json())
//       .then((response) => {
//         dispatch(getUsersSuccess(response.data));
//         return response.data;
//       })
//       .catch((error) => {
//         dispatch(getUsersError(error.toStrign()));
//       });
//   };
// };

export const getUsers: AppThunk = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getUsersPending());
      const response = await fetch('http://localhost:4000/user');
      const jsonRes = await (response.json() as Promise<ApiResponse<undefined | User[]>>);
      if (jsonRes.data?.length) {
        return dispatch(getUsersSuccess(jsonRes.data));
      } else {
        // TODO CHECK TYPE
        return dispatch(getUsersError(jsonRes.error[0].message));
      }
    } catch (error) {
      dispatch(getUsersError(error));
    }
  };
};
