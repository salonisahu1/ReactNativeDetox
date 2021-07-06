import React, {useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {AuthContext} from '../../store/AuthProvider';
import firestore from '@react-native-firebase/firestore';

export default (props) => {
  const {navigation} = props;
  const {user, logout} = useContext(AuthContext);
  const [posts, setPosts] = useState([{}]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    const subscriber = firestore()
      .collection('posts')
      .onSnapshot(
        (snapshot) => {
          console.log('snapshot :>> ', snapshot);
          let postsData = [];
          snapshot.docs.forEach((doc) => {
            postsData.push(doc.data());
          });
          setPosts(postsData);
        },
        (err) => console.log(err.message),
      );
    return () => subscriber;
  }, []);

  const addNew = () => {
    firestore()
      .collection('posts')
      .add({
        title: title,
        description: desc,
      })
      .then(() => {
        console.log('Document successfully written!');
        setTitle('');
        setDesc('');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
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
        }}
        testID="WelcomeText">
        Hey, {user?.email}
      </Text>
      <Button
        mode="contained"
        onPress={async () => {
          logout().catch((err) => {
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
          });
        }}
        style={{
          margin: 10,
          paddingVertical: 10,
          width: 150,
          alignSelf: 'center',
        }}
        testID="LogoutButton">
        Log Out
      </Button>
      <TextInput
        label="Post Name"
        value={title}
        onChangeText={(title) => setTitle(title)}
        mode="outlined"
        style={{margin: 10}}
      />
      <TextInput
        label="Description"
        value={desc}
        onChangeText={(data) => setDesc(data)}
        mode="outlined"
        multiline
        style={{margin: 10}}
      />
      <Button
        mode="contained"
        onPress={addNew}
        style={{
          margin: 10,
          paddingVertical: 10,
          width: 150,
          alignSelf: 'center',
        }}>
        Add
      </Button>
      {posts.map((post, index) => (
        <Text key={index}>{post?.title}</Text>
      ))}
    </View>
  );
};
