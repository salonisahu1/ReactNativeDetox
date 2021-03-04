import React from 'react';
import {View, Text, Alert} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default (props) => {
  const {navigation} = props;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const login = async (value) => {
    setLoading(true);
    try {
      await AsyncStorage.setItem('@email', JSON.stringify(email));
      await AsyncStorage.setItem('@password', JSON.stringify(password));
      await AsyncStorage.setItem('@isSignedIn', true);
      navigation.reset({
        index: 0,
        routes: [{name: 'HomeScreen'}],
      });
      setLoading(false);
    } catch (e) {
      // saving error
      console.log('e :>> ', e);
      await AsyncStorage.setItem('@email', null);
      await AsyncStorage.setItem('@password', null);
      await AsyncStorage.setItem('@isSignedIn', null);
      Alert.alert(
        'Error',
        'Something went Wrong. Please try again..',
        [
          {
            text: 'Ok',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 20,
      }}>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 26,
          marginBottom: 10,
          fontWeight: '500',
        }}>
        Login
      </Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        mode="outlined"
        style={{margin: 10}}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        mode="outlined"
        style={{margin: 10}}
        secureTextEntry={true}
      />
      <Button
        mode="contained"
        onPress={login}
        style={{margin: 10, paddingVertical: 10}}>
        Login
      </Button>
    </View>
  );
};
