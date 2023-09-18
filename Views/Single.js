import React, {useContext, useEffect, useRef, useState} from 'react';
import {ScrollView, Text} from 'react-native';
import {PropTypes} from 'prop-types';
import {mediaUrl} from '../utils/app-config';
import {Button, Card, Icon, Image, ListItem} from '@rneui/themed';
import {Video} from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFavourite, useUser} from '../hook/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import * as ScreenOrientation from 'expo-screen-orientation';

const Single = ({route, navigation}) => {
  const [owner, setOwner] = useState({});
  const [userLike, setUserLike] = useState(false);
  const [likes, setLikes] = useState([]);
  const {user} = useContext(MainContext);
  const {getUserById} = useUser();
  const {postFavourite, getFavouritesById, deleteFavourite} = useFavourite();

  const videoRef = useRef(null);

  const {
    title,
    description,
    filename,
    time_added: timeAdded,
    user_id: userId,
    media_type: mediaType,
    file_id: fileId,
  } = route.params;

  // fetch owner info
  const fetchOwner = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const ownerData = await getUserById(userId, token);
      setOwner(ownerData);
    } catch (error) {
      console.error(error.message);
    }
  };

  // add favourite
  const createFavourite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postFavourite({file_id: fileId}, token);
      response && setUserLike(true);
    } catch (error) {
      console.error(error.message);
    }
  };
  // delete favourite
  const removeFavourite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await deleteFavourite(fileId, token);
      response && setUserLike(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  // getfavouritesbyid
  const fetchLikes = async () => {
    try {
      const likesData = await getFavouritesById(fileId);
      setLikes(likesData);
      // check if userid stored in context is in likesData
      likesData.forEach((like) => {
        if (like.user_id === user.user_id) {
          setUserLike(true);
        }
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  // fullscreen video on landscape
  const unlockOrientation = async () => {
    try {
      await ScreenOrientation.unlockAsync();
    } catch (error) {
      console.error(error.message);
    }
  };

  const lockOrientation = async () => {
    try {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP,
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const showVideoInFullscreen = async () => {
    try {
      await videoRef.current.presentFullscreenPlayer();
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    unlockOrientation();
    fetchOwner();

    // fullscreen video on landscape
    const orientSub = ScreenOrientation.addOrientationChangeListener(
      (event) => {
        if (event.orientationInfo.orientation > 2) {
          showVideoInFullscreen();
        }
      },
    );

    return () => {
      ScreenOrientation.removeOrientationChangeListener(orientSub);
      lockOrientation();
    };
  }, []);

  useEffect(() => {
    fetchLikes();
  }, [userLike]);

  return (
    <ScrollView>
      <Card containerStyle={{width: '100%', margin: 'auto'}}>
        {mediaType === 'image' ? (
          <Image
            source={{
              uri: mediaUrl + filename,
            }}
            containerStyle={{width: '100%', height: 325}}
          ></Image>
        ) : (
          <Video
            source={{uri: mediaUrl + filename}}
            style={{height: 300}}
            useNativeControls
            resizeMode="contain"
            shouldPlay={true}
            isLooping
            ref={videoRef}
          ></Video>
        )}

        <ListItem>
          <Icon name="chat"></Icon>
          <Text>{title}</Text>
        </ListItem>
        <ListItem>
          <Icon name="list"></Icon>
          <Text>Description: {description}</Text>
        </ListItem>
        <ListItem>
          <Icon name="event"></Icon>
          <Text>Uploaded: {timeAdded.slice(0, -14)}</Text>
        </ListItem>
        <ListItem>
          <Icon name="person"></Icon>
          <Text>{owner.username}</Text>
        </ListItem>
        <ListItem>
          <Text>Total likes: {likes.length}</Text>
        </ListItem>
        <ListItem>
          {userLike ? (
            <Button onPress={removeFavourite}>Remove like</Button>
          ) : (
            <Button onPress={createFavourite}>Like</Button>
          )}
        </ListItem>
      </Card>
    </ScrollView>
  );
};

Single.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};
export default Single;
