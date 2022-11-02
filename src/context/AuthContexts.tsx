import firebase from 'firebase/app';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';

import { auth } from 'src/helper/firebase';

//CONTEXT

export const AuthContext = React.createContext<any | null>(null); //no estoy seguro de que sea .FirebaseApp

//PROVIDER
interface myProps {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<myProps> = ({ children }) => {
  //React.FC??? Consultar sobre este type

  const [user, setUser] = useState<any | null>(null); // typescript me obliga a tipar esto

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log('credential', credential);
        console.log('token', token);
        console.log('user', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log('credential', credential);
        console.log('errorCode', errorCode);
        console.log('errorMessage', errorMessage);
      });
  };

  return <AuthContext.Provider value={{ googleSignIn, user }}>{children}</AuthContext.Provider>;
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
