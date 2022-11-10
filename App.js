/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {AuthProvider} from './src/store/AuthProvider';
import AppScreen from './src/navigation';

const App: () => React$Node = () => {
  return (
    <AuthProvider>
      <AppScreen />
    </AuthProvider>
  );
};

export default App;
