import React from 'react';
import {Platform, SafeAreaView, StyleSheet} from 'react-native';
import List from '../components/List';
import PropTypes from 'prop-types';

const Home = ({navigation}) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <List navigation={navigation} />
      </SafeAreaView>
    </>
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

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
