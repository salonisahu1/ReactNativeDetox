import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../store/AuthProvider';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

export default () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Config.WEB_CLIENT_ID,
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="">
          {user ? (
            <Stack.Screen name="App" component={AppStack} />
          ) : (
            <Stack.Screen name="Auth" component={AuthStack} />
          )}
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
