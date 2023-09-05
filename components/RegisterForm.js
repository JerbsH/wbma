import {Text} from 'react-native';
import React from 'react';
import {useUser} from '../hook/ApiHooks';
import {useForm, Controller} from 'react-hook-form';
import {Button, Card, Input} from '@rneui/themed';

const RegisterForm = () => {
  const {postUser} = useUser();
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
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

      {errors.username && <Text style={{color: 'red'}}>This is required.</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Username"
            autoCapitalize="none"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="username"
      />

      {errors.password && <Text style={{color: 'red'}}>This is required.</Text>}
      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />

      {errors.email && <Text style={{color: 'red'}}>This is required.</Text>}
      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Email"
            autoCapitalize="none"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Full name"
            autoCapitalize="none"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="full_name"
      />

      <Button
        buttonStyle={{
          borderRadius: 10,
        }}
        title="Submit"
        onPress={handleSubmit(register)}
      />
    </Card>
  );
};

export default RegisterForm;
