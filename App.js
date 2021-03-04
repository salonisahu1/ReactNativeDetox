/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App: () => React$Node = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  React.useEffect(() => {
    console.log('here :>> ');
    getData();
  });

  const getData = async () => {
    try {
      const isSignedIn = await AsyncStorage.getItem('@email');
      console.log('email :>> ', isSignedIn);
      if (isSignedIn !== null) {
        setIsSignedIn(true);
      }
    } catch (e) {
      console.log('e :>> ', e);
      setIsSignedIn(false);
    }
  };

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
          {!isSignedIn ? (
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
          ) : (
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
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

export default App;
