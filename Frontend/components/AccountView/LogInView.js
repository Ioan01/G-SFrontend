import React, {useContext, useEffect, useState} from 'react';
import {PixelRatio, Text, View} from 'react-native';
import {
  ActivityIndicator,
  Banner,
  Button,
  HelperText,
  TextInput,
  Title,
} from 'react-native-paper';
import {HttpStatus, sendJsonRequest} from '../../HttpHandler';
import {AccountContext} from '../../Contexts/AccountContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {waitFor} from '@babel/core/lib/gensync-utils/async';
import {getProfileData, login} from '../../Contexts/Login';

const LogInView = ({route, navigation}) => {
  const [passwordHidden, hidePassword] = useState(true);

  const [helperText, setHelperText] = useState('');

  const [loading, setLoading] = useState(false);

  const {
    foundAccount,
    loggedIn,
    username,
    password,
    setPassword,
    setUsername,
    setLoggedIn,
    setProfileName,
    setProfileRole,
    setMoney,
  } = useContext(AccountContext);

  useEffect(() => {
    if (foundAccount) {
      if (username !== '' && password !== '') {
        login();
      }
    }
  });

  return (
    <View style={{marginHorizontal: 30, marginTop: 100 / PixelRatio.get()}}>
      <Title
        style={{alignSelf: 'center', marginBottom: 100 / PixelRatio.get()}}>
        Log in with your account
      </Title>
      <TextInput
        mode={'outlined'}
        style={{marginBottom: 30 / PixelRatio.get()}}
        value={username}
        onChangeText={text => {
          setHelperText('');
          setUsername(text);
        }}
        placeholder={'Enter username'}
      />

      <TextInput
        mode={'outlined'}
        secureTextEntry={passwordHidden}
        placeholder={'Enter password'}
        value={password}
        onChangeText={text => {
          setPassword(text);
          setHelperText('');
        }}
        right={
          <TextInput.Icon
            name="eye"
            onPress={() => hidePassword(!passwordHidden)}
            style={{marginHorizontal: 40}}
          />
        }
      />

      <HelperText
        type={'error'}
        style={{marginBottom: 30 / PixelRatio.get()}}
        visible={helperText !== ''}>
        {helperText}
      </HelperText>
      <Button
        mode={'outlined'}
        onPress={async () => {
          setHelperText('');
          await login(
            username,
            password,
            setLoggedIn,
            setHelperText,
            setLoading,
          ).then(
            getProfileData(setProfileName, setMoney, setProfileRole, null),
          );
        }}>
        Log In
      </Button>
      <Banner
        style={{
          marginTop: 100 / PixelRatio.get(),
          marginBottom: 100 / PixelRatio.get(),
        }}
        visible={true}
        actions={[
          {
            label: 'Register a new account',
            onPress: () => {
              navigation.navigate('Create Account');
            },
          },
        ]}>
        <Text style={{fontSize: 30}}>Don't have an account?</Text>
      </Banner>
      <ActivityIndicator animating={loading} size={'large'} />
    </View>
  );
};

export default LogInView;
