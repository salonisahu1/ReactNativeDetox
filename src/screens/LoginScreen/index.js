import React, {useContext} from 'react';
import {View, Text, Alert} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {AuthContext} from '../../store/AuthProvider';

export default (props) => {
  const {navigation} = props;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const {login} = useContext(AuthContext);

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
        onPress={async () => {
          const err = await login(email, password);
          if (err) {
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
          }
        }}
        style={{margin: 10, paddingVertical: 10}}>
        Login
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
