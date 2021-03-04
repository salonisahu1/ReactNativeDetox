import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.log('error login :>> ', e);
    }
  };
  const register = async (email, password) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
      console.log('error register :>> ', e);
    }
  };
  const logout = async () => {
    try {
      await auth().signOut();
    } catch (e) {
      console.log('error logout :>> ', e);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
