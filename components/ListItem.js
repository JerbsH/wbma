import PropTypes from 'prop-types';
import {mediaUrl} from '../utils/app-config';
import {Avatar, Button, ListItem as RNEListItem} from '@rneui/themed';
import {Alert} from 'react-native';

const ListItem = ({singleMedia, navigation, userId}) => {
  const deleteFile = async () => {
    Alert.alert(
      'Delete',
      `File id: ${singleMedia.file_id}, Are you sure you want to delete this file?`,
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('cancel pressed');
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            console.log('deleting file', singleMedia.file_id);
            try {
              // TODO: use useMedia hook to delete files 
              await deleteMedia();
            } catch (error) {
              console.error(error.message);
            }
          },
        },
      ],
    );
  };

  const modifyFile = async () => {
    console.log('modify');
  };

  return (
    <>
      <RNEListItem>
        <Avatar
          size={'large'}
          source={{
            uri: mediaUrl + singleMedia.thumbnails.w160,
          }}
        ></Avatar>
        <RNEListItem.Content>
          <RNEListItem.Title>{singleMedia.title}</RNEListItem.Title>
          <RNEListItem.Subtitle>{singleMedia.description}</RNEListItem.Subtitle>
        </RNEListItem.Content>
        {singleMedia.user_id == userId && (
          <>
            <Button
              title={'Modify'}
              buttonStyle={{
                borderRadius: 30,
              }}
              onPress={modifyFile}
            >
              Modify
            </Button>
            <Button
              title={'Delete'}
              buttonStyle={{
                borderRadius: 30,
              }}
              onPress={deleteFile}
              color={'error'}
            ></Button>
          </>
        )}
        <Button
          title="View"
          onPress={() => {
            navigation.navigate('Single', singleMedia);
          }}
          buttonStyle={{
            borderRadius: 30,
          }}
        ></Button>
      </RNEListItem>
    </>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
  userId: PropTypes.number,
};
export default ListItem;
