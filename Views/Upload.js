import {Button, Card, Input} from '@rneui/themed';
import {Controller, useForm} from 'react-hook-form';
import {Alert, StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useContext, useState} from 'react';
import {placeholderImage} from '../utils/app-config';
import {Video} from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMedia} from '../hook/ApiHooks';
import {PropTypes} from 'prop-types';
import {MainContext} from '../contexts/MainContext';

const Upload = ({navigation}) => {
  const {update, setUpdate} = useContext(MainContext);
  const [image, setImage] = useState(placeholderImage);
  const [type, setType] = useState('image');
  const {postMedia, loading} = useMedia();
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
    mode: 'onBlur',
  });

  const upload = async (uploadData) => {
    console.log(uploadData);
    const formData = new FormData();
    formData.append('title', uploadData.title);
    formData.append('description', uploadData.description);

    const fileName = image.split('/').pop();
    let fileExtension = fileName.split('.').pop();
    fileExtension = fileExtension === 'jpg' ? 'jpeg' : fileExtension;

    formData.append('file', {
      uri: image,
      name: fileName,
      type: `${type}/${fileExtension}`,
    });

    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postMedia(formData, token);
      console.log('lataus', response);
      setUpdate(!update);
      Alert.alert('Upload', `${response.message} (id: ${response.file_id})`, [
        {
          text: 'OK',
          onPress: () => {
            resetForm();
            navigation.navigate('Home');
          },
        },
      ]);
    } catch (error) {
      console.log(error.message);
    }
  };

  const resetForm = () => {
    reset();
    setType('image');
    setImage(placeholderImage);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setType(result.assets[0].type);
    }
  };

  return (
    <Card containerStyle={{borderRadius: 10}}>
      {type === 'image' ? (
        <Card.Image
          source={{uri: image}}
          style={styles.image}
          onPress={pickImage}
        />
      ) : (
        <Video
          source={{uri: image}}
          style={styles.image}
          useNativeControls={true}
          resizeMode="contain"
        />
      )}

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.title?.message}
          />
        )}
        name="title"
      />

      <Controller
        control={control}
        rules={{
          minLength: {value: 10, message: 'min 10 characters'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Description (optional)"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.description?.message}
          />
        )}
        name="description"
      />
      <Button
        buttonStyle={{
          borderRadius: 10,
          marginBottom: 10,
        }}
        title="Choose Media"
        onPress={pickImage}
      />
      <Button
        buttonStyle={{
          borderRadius: 10,
          marginBottom: 10,
        }}
        title="Reset"
        onPress={resetForm}
      />
      <Button
        disabled={
          image === placeholderImage || errors.description || errors.title
        }
        loading={loading}
        buttonStyle={{
          borderRadius: 10,
        }}
        title="Upload"
        onPress={handleSubmit(upload)}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 15,
    resizeMode: 'contain',
  },
});

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
