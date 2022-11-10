import React from 'react';
import {useContext} from 'react';
import {View, Text, Alert} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {AuthContext} from '../../store/AuthProvider';
import Spinner from 'react-native-loading-spinner-overlay';

export default (props) => {
  const {navigation} = props;

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const {register} = useContext(AuthContext);

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
        }}>
        Sign Up!
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
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        mode="outlined"
        style={{margin: 10}}
        secureTextEntry={true}
      />
      <Button
        mode="contained"
        onPress={async () => {
          setLoading(true);
          register(email, password)
            .then((res) => {
              //
            })
            .catch((err) => {
              Alert.alert(
                'Error',
                err?.code,
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
            })
            .finally(() => setLoading(false));
        }}
        style={{margin: 10, paddingVertical: 10}}>
        Sign Up
      </Button>
      <Button
        mode="text"
        onPress={() => navigation.navigate('LoginScreen')}
        style={{margin: 10, paddingVertical: 10}}>
        Already have an account? Sign In!
      </Button>
    </View>
  );
};
