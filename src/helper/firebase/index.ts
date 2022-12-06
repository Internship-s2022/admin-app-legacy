import 'firebase/compat/auth';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';

import { loginSuccess, setAuthentication } from 'src/redux/auth/actions';
import store from 'src/redux/store';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

export const tokenListener = () => {
  auth.onIdTokenChanged(async (user) => {
    try {
      if (user) {
        const {
          token,
          claims: { role, email, name, picture },
        } = await user.getIdTokenResult(true);
        store.dispatch(
          loginSuccess({
            token,
            accessRoleType: role,
            email,
            name,
            photo: picture,
          }),
        );
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        store.dispatch(
          setAuthentication({ token: '', accessRoleType: '', email: '', name: '', photo: '' }),
        );
      }
    } catch (error: any) {
      return console.error(error);
    }
  });
};

export default firebaseApp;
