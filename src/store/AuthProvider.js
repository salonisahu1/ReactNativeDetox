import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      return auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      throw e;
    }
  };

  const socialLogin = async (type) => {
    try {
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (e) {
      throw e;
    }
  };

  const register = async (email, password) => {
    try {
      return auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
      throw e;
    }
  };
  const logout = async () => {
    try {
      await auth().signOut();
    } catch (e) {
      console.log('error logout :>> ', e);
      return e;
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        socialLogin,
        register,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
