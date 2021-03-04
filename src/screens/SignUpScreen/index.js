import React from 'react';
import {useContext} from 'react';
import {View, Text, Alert} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {AuthContext} from '../../store/AuthProvider';

export default (props) => {
  const {navigation} = props;

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const {register} = useContext(AuthContext);

  const signup = async (value) => {
    setLoading(true);
    try {
      navigation.navigate('HomeScreen');
      setLoading(false);
    } catch (e) {
      // saving error
      console.log('e :>> ', e);
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
        onPress={() => register(email, password)}
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
