import React from 'react';
import {useUser} from '../hook/ApiHooks';
import {useForm, Controller} from 'react-hook-form';
import {Button, Card, Input} from '@rneui/themed';

const RegisterForm = () => {
  const {postUser, checkUsername} = useUser();
  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const register = async (userData) => {
    try {
      await postUser(userData);
      alert('Created user ' + userData.username);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card containerStyle={{borderRadius: 10}}>
      <Card.Title style={{fontSize: 15}}>REGISTER</Card.Title>

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          minLength: {value: 3, message: 'minimum length is 3'},
          validate: async (value) => {
            try {
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
          required: {value: true, message: 'is required'},
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
          required: {value: true, message: 'is required'},
          validate: (value) => {
            const {password} = getValues();
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
          required: {value: true, message: 'is required'},
          pattern: {
            // TODO: add better regexp for email
            value: /@/,
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
        title="Register"
        onPress={handleSubmit(register)}
      />
    </Card>
  );
};

export default RegisterForm;
