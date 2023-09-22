import React, {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hook/ApiHooks';
import {mediaUrl} from '../utils/app-config';
import {Button, Card, Icon, ListItem} from '@rneui/themed';
import ProfileForm from '../components/ProfileForm';
import {ScrollView} from 'react-native';
import {PropTypes} from 'prop-types';

const Profile = ({navigation}) => {
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
      <ScrollView>
        <Card containerStyle={{borderRadius: 10}}>
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
          <Button
            onPress={() => {
              navigation.navigate('My files');
            }}
            buttonStyle={{
              borderRadius: 10,
              marginBottom: 5,
            }}
          >
            My files
            <Icon name="storage"></Icon>
          </Button>
          <Button
            onPress={logOut}
            buttonStyle={{
              borderRadius: 10,
            }}
          >
            Log Out
            <Icon name="logout"></Icon>
          </Button>
          <ProfileForm user={user} />
        </Card>
      </ScrollView>
    </>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
