import React, {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hook/ApiHooks';
import {mediaUrl} from '../utils/app-config';
import {Button, Card, Icon, ListItem} from '@rneui/themed';

const Profile = (props) => {
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const {getFilesByTag} = useTag();
  const {setIsLoggedIn, user} = useContext(MainContext);
  const logOut = async () => {
    console.log('profile, logout');
    try {
      await AsyncStorage.clear();
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };
  const loadAvatar = async () => {
    try {
      const avatars = await getFilesByTag('avatar_' + user.user_id);
      if (avatars.length > 0) {
        setAvatar(mediaUrl + avatars.pop().filename);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadAvatar();
  }, []);
  return (
    <>
      <Card>
        <Card.Title>{user.username}</Card.Title>
        <Card.Image source={{uri: avatar}} />
        <ListItem>
          <Icon name="email"></Icon>
          <ListItem.Title>{user.email}</ListItem.Title>
        </ListItem>
        <ListItem>
          <Icon name="person"></Icon>
          <ListItem.Title>{user.full_name}</ListItem.Title>
        </ListItem>
        <Card.Divider></Card.Divider>
        <Button title="Log out!" onPress={logOut}></Button>
      </Card>
    </>
  );
};

export default Profile;
