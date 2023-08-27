import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
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
          <Text style={{color: '#fff', textAlign: 'justify', fontSize: 11}}>{props.singleMedia.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

const styles = StyleSheet.create({
  TouchableOpacity: {
    margin: 2,
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'darkblue',
    borderRadius: 15,
  },
  Image: {
    borderRadius: 15,
    margin: 5,
    width: '45%',
    height: 'auto',
  },
  View: {
    width: '45%',
    margin: 5,
  },
  Text: {
    textAlign: 'center',
    color: '#fff',
    height: 'auto',
    width: '100%',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default ListItem;
