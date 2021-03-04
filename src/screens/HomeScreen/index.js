import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default (props) => {
  const {navigation} = props;
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getData();
  });

  const getData = async () => {
    setLoading(true);
    try {
      const email = await AsyncStorage.getItem('@email');
      if (email !== null) {
        setEmail(email);
      }
      setLoading(false);
    } catch (e) {
      console.log('e :>> ', e);
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await AsyncStorage.removeItem('@email');
      await AsyncStorage.removeItem('@password');
      await AsyncStorage.removeItem('@isSignedIn');
      setLoading(false);
      navigation.push('LoginScreen');
    } catch (e) {
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
        Hey, {email}
      </Text>
      <Button
        mode="contained"
        onPress={logout}
        style={{
          margin: 10,
          paddingVertical: 10,
          width: 150,
          alignSelf: 'center',
        }}>
        Log Out
      </Button>
    </View>
  );
};
