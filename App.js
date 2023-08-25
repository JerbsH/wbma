import {Platform, SafeAreaView, StyleSheet} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import List from './components/List';

const App = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <List />
      </SafeAreaView>
      <StatusBar style="auto" />
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

export default App;
