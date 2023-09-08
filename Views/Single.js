import React from 'react';
import {Text} from 'react-native';
import {PropTypes} from 'prop-types';
import {mediaUrl} from '../utils/app-config';
import {Card, Image} from '@rneui/themed';

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
      <Card.Title>{singleMedia.title}</Card.Title>
      <Text>Description: {singleMedia.description}</Text>
      <Text>Uploaded: {singleMedia.time_added.slice(0, -14)}</Text>
      <Text>Type: {singleMedia.mime_type}</Text>
    </Card>
  );
};

Single.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};
export default Single;
