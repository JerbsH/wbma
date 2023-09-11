import PropTypes from 'prop-types';
import {mediaUrl} from '../utils/app-config';
import {Avatar, Button, ListItem as RNEListItem} from '@rneui/themed';

const ListItem = ({singleMedia, navigation}) => {
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
};
export default ListItem;
