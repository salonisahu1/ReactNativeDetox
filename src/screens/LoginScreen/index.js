import React, {useContext} from 'react';
import {View, Text, Alert, ActivityIndicator} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {AuthContext} from '../../store/AuthProvider';
import Spinner from 'react-native-loading-spinner-overlay';

const GOOGLE = 'GOOGLE';

export default (props) => {
  const {navigation} = props;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const {login, socialLogin} = useContext(AuthContext);

  const showError = (err) => {
    Alert.alert(
      'Error',
      err?.message,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 20,
      }}>
      <Spinner visible={loading} />
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 26,
          marginBottom: 10,
          fontWeight: '500',
        }}
        testID="Login">
        Login
      </Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        mode="outlined"
        style={{margin: 10}}
        testID="Email"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        mode="outlined"
        style={{margin: 10}}
        secureTextEntry={true}
        testID="Password"
      />
      <Button
        mode="contained"
        onPress={async () => {
          setLoading(true);
          login(email, password)
            .then((res) => {
              console.log('res');
            })
            .catch((err) => {
              showError(err);
            })
            .finally(() => setLoading(false));
        }}
        style={{margin: 10, paddingVertical: 10}}
        testID="LoginButton">
        Login
      </Button>
      <Text style={{textAlign: 'center'}}>Or</Text>
      <Button
        mode="contained"
        onPress={async () => {
          setLoading(true);
          socialLogin(GOOGLE)
            .then((res) => {
              console.log('RES', res);
            })
            .catch((err) => {
              showError(err);
            })
            .finally(() => setLoading(false));
        }}
        style={{margin: 10, paddingVertical: 10}}
        testID="GLoginButton">
        Login with Google
      </Button>
      <Button
        mode="text"
        onPress={() => navigation.navigate('SignUpScreen')}
        style={{margin: 10, paddingVertical: 10}}>
        Don't have an account? Sign up!
      </Button>
    </View>
  );
};
