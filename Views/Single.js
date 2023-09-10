import React from 'react';
import {Text} from 'react-native';
import {PropTypes} from 'prop-types';
import {mediaUrl} from '../utils/app-config';
import {Card, Icon, Image, ListItem} from '@rneui/themed';

const Single = ({route, navigation}) => {
  const singleMedia = route.params;
  return (
    <Card containerStyle={{width: '100%', margin: 'auto'}}>
      <Image
        source={{
          uri: mediaUrl + singleMedia.filename,
        }}
        containerStyle={{width: '100%', height: 325}}
      ></Image>
      <ListItem>
        <Icon name='chat'></Icon>
        <Text>{singleMedia.title}</Text>
      </ListItem>
      <ListItem>
        <Icon name='list'></Icon>
        <Text>Description: {singleMedia.description}</Text>
      </ListItem>
      <ListItem>
        <Icon name='event'></Icon>
        <Text>Uploaded: {singleMedia.time_added.slice(0, -14)}</Text>
      </ListItem>
      <ListItem>
        <Icon name="person"></Icon>
        <Text>{singleMedia.user_id}</Text>
      </ListItem>
    </Card>
  );
};

Single.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};
export default Single;
