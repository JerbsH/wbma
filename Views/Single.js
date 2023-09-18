/* eslint-disable camelcase */
import React from 'react';
import {Text} from 'react-native';
import {PropTypes} from 'prop-types';
import {mediaUrl} from '../utils/app-config';
import {Card, Icon, Image, ListItem} from '@rneui/themed';
import {Video} from 'expo-av';

const Single = ({route, navigation}) => {
  const {
    title,
    description,
    filename,
    time_added: timeAdded,
    user_id: userId,
    media_type,
  } = route.params;
  return (
    <Card containerStyle={{width: '100%', margin: 'auto'}}>
      {media_type === 'image' ? (
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
        <Text>{userId}</Text>
      </ListItem>
    </Card>
  );
};

Single.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};
export default Single;
