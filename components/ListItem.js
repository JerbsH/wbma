import {
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const ListItem = (props) => {
  return (
    <TouchableOpacity style={styles.TouchableOpacity}>
      <View style={styles.box}>
        <Image
          style={styles.Image}
          source={{uri: props.singleMedia.thumbnails.w160}}
        />
        <View style={styles.View}>
          <Text style={styles.Text}>{props.singleMedia.title}</Text>
          <Text>{props.singleMedia.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

ListItem.PropTypes = {
  singleMedia: PropTypes.object,
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

export default ListItem;
