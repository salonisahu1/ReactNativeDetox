import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {AuthContext} from '../../store/AuthProvider';

export default (props) => {
  const {navigation} = props;
  const {user, logout} = useContext(AuthContext);

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
        Hey, {user?.email}
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
