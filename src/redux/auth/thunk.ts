import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import firebase from 'firebase/compat';
import { Dispatch } from 'redux';

import { auth } from 'src/helper/firebase';

import { AppThunk } from '../types';
// import { setLoaderOff, setLoaderOn } from '../ui/actions';
import { loginError, loginPending, loginSuccess } from './actions';
import { authUserRequest } from './api';

export const login: AppThunk = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(loginPending());
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        hd: 'radiumrocket.com',
      });

      const result = await signInWithPopup(auth, provider);

      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.idToken;

      // The signed-in user info.
      const userBody = {
        email: result.user.email,
        firebaseUid: result.user.uid,
      };

      const response = await authUserRequest(userBody);
      console.log('LA RESPONSE:');
      console.log({ response });

      const authUserData = {
        name: response.data.firstName,
        token: token,
        accessRoleType: response.data.accessRoleType,
        email: response.data.email,
        photo: result.user.photoURL,
      };

      if (!response.error) {
        dispatch(loginSuccess(authUserData));
        localStorage.setItem('role', response.data.accessRoleType);
      }
    } catch (error: any) {
      dispatch(loginError(error));
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.log(error);
      console.log('credential', credential);
      console.log('errorCode', errorCode);
      console.log('errorMessage', errorMessage);
    }
  };
};
