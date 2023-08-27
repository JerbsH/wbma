import {
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import List from './components/List';
import {Settings} from 'react-native-feather';
const image = {uri: 'http://placekitten.com/160/172'};

const App = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={styles.imageBackground}
        >
          <Settings
            stroke="white"
            fill="none"
            width={32}
            height={32}
            style={styles.icon}
          />
          <Text style={styles.Text}>CATS</Text>
        </ImageBackground>
        <List />
      </SafeAreaView>
      <StatusBar style="auto" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 'auto',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    position: 'relative',
    height: 250,
    width: '100%',
    borderRadius: 10,
  },
  Text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    padding: 10,
    backgroundColor: 'darkblue',
    position: 'absolute',
    bottom: 10,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 2,
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default App;
