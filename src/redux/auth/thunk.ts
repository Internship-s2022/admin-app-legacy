import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Dispatch } from 'redux';

import { auth } from 'src/helper/firebase';

import { AppThunk } from '../types';
// import { setLoaderOff, setLoaderOn } from '../ui/actions';
import { loginError, loginPending, loginSuccess } from './actions';

export const login: AppThunk = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(loginPending());
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        hd: 'radiumrocket.com',
      });

      const result = await signInWithPopup(auth, provider);

      const token = await result.user.getIdToken();

      const {
        claims: { role },
      } = await result.user.getIdTokenResult();

      // The signed-in user info.
      const userBody = {
        token: token,
        name: result.user.displayName,
        email: result.user.email,
        accessRoleType: role,
        photo: result.user.photoURL,
      };

      dispatch(loginSuccess(userBody));
    } catch (error: any) {
      dispatch(loginError(error));
    }
  };
};
