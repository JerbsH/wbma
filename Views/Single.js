import React from 'react';
import {Image, Platform, SafeAreaView, StyleSheet, Text} from 'react-native';
import {PropTypes} from 'prop-types';
import {mediaUrl} from '../utils/app-config';

const Single = ({route, navigation}) => {
  const singleMedia = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{
          uri: mediaUrl + singleMedia.filename,
        }}
        height={300}
        width={'100%'}
      ></Image>
      <Text>Title: {singleMedia.title}</Text>
      <Text>Description: {singleMedia.description}</Text>
      <Text>Uploaded: {singleMedia.time_added.slice(0, -14)}</Text>
      <Text>Type: {singleMedia.mime_type}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TouchableOpacity: {
    marginVertical: 2,
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
  },
  Image: {
    margin: 5,
    width: '45%',
    height: 'auto',
  },
  View: {
    width: '50%',
    margin: 5,
  },
  Text: {
    height: 'auto',
    width: '100%',
  },
});

Single.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};
export default Single;
