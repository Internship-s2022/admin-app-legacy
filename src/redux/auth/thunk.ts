import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Dispatch } from 'redux';

import { auth } from 'src/helper/firebase';

import { loginError, loginPending } from './actions';

export const login = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(loginPending());
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        hd: process.env.REACT_APP_EMAIL_DOMAIN,
      });

      const result = await signInWithPopup(auth, provider);

      const {
        claims: { role },
      } = await result.user.getIdTokenResult();

      return role as string;
    } catch (error: any) {
      return dispatch(loginError(error));
    }
  };
};
