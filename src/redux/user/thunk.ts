import { Dispatch } from 'redux';

import { getUsersError, getUsersPending, getUsersSuccess } from './actions';
import { ApiResponse, User } from './types';

// export const getUsers: AppThunk = () => {
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

// export const getUsers: AppThunk = () => {
//   return async (dispatch: Dispatch) => {
//     dispatch(getUsersPending());
//     try {
//       const response = await fetch('localhost:4000/user');
//       const jsonRes = await (response.json() as Promise<ApiResponse<undefined | User[]>>);
//       if (jsonRes.data?.length) {
//         dispatch(getUsersSuccess(jsonRes));
//       } else {
//         // TODO CHECK TYPE
//         dispatch(getUsersError(jsonRes));
//       }
//     } catch (error) {
//       dispatch(getUsersError(error));
//     }
//   };
// };
