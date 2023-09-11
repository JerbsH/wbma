import React, {useContext} from 'react';
import {useUser} from '../hook/ApiHooks';
import {useForm, Controller} from 'react-hook-form';
import {Button, Card, Input} from '@rneui/themed';
import {Alert} from 'react-native';
import {PropTypes} from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const ProfileForm = ({user}) => {
  const {putUser, checkUsername, getUserByToken} = useUser();
  const {setIsLoggedIn} = useContext(MainContext);
  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm({
    defaultValues: {...user, password: '', confirm_password: ''},
    mode: 'onBlur',
  });

  const update = async (updateData) => {
    try {
      delete updateData.confirm_password;
      // poistetaan tyhjät arvot
      for (const [i, value] of Object.entries(updateData)) {
        if (value === '') {
          delete updateData[i];
        }
      }
      const token = await AsyncStorage.getItem('userToken');
      const updateResult = await putUser(updateData, token);
      Alert.alert('Success', updateResult.message);
      // päivitä käyttäjä ruudulla
      const userData = await getUserByToken(token);
      setIsLoggedIn(userData);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <Card containerStyle={{borderRadius: 10}}>
      <Card.Title style={{fontSize: 15}}>UPDATE</Card.Title>

      <Controller
        control={control}
        rules={{
          minLength: {value: 3, message: 'minimum length is 3'},
          validate: async (value) => {
            try {
              if (value.length > 3) {
                return;
              }
              const isAvailable = await checkUsername(value);
              console.log('username available? ', isAvailable);
              return isAvailable ? isAvailable : 'Username taken';
            } catch (error) {
              console.error(error);
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Username"
            autoCapitalize="none"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.username?.message}
          />
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{
          minLength: {value: 6, message: 'minimum length is 6'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.password?.message}
          />
        )}
        name="password"
      />

      <Controller
        control={control}
        rules={{
          validate: (value) => {
            const {password} = getValues();
            if (password.length) {
              return;
            }
            return value === password ? true : 'Passwords do not match';
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Confirm Password"
            secureTextEntry={true}
            autoCapitalize="none"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.confirm_password?.message}
          />
        )}
        name="confirm_password"
      />

      <Controller
        control={control}
        rules={{
          pattern: {
            value: /\S+@\S+\.\S+$/,
            message: 'must be a valid email',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Email"
            autoCapitalize="none"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.email?.message}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          maxLength: 100,
          minLength: {value: 3, message: 'minimum length is 3'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Full name"
            autoCapitalize="none"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.full_name?.message}
          />
        )}
        name="full_name"
      />

      <Button
        buttonStyle={{
          borderRadius: 10,
        }}
        title="Update"
        onPress={handleSubmit(update)}
      />
    </Card>
  );
};

ProfileForm.propTypes = {
  user: PropTypes.object,
};

export default ProfileForm;