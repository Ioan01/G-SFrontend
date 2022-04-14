import React, {useContext, useEffect, useState} from 'react';
import {PixelRatio, Text, View} from 'react-native';
import {Banner, Button, HelperText, TextInput, Title} from 'react-native-paper';
import {HttpStatus, sendJsonRequest} from '../../HttpHandler';
import {AccountContext} from '../../Contexts/AccountContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {waitFor} from '@babel/core/lib/gensync-utils/async';

const LogInView = ({route, navigation}) => {
  const [passwordHidden, hidePassword] = useState(true);

  const [helperText, setHelperText] = useState('');

  const {loggedIn, username, password, setPassword, setUsername, setLoggedIn} =
    useContext(AccountContext);

  async function login() {
    try {
      const resp = await sendJsonRequest(
        'POST',
        'login',
        {username: username, password: password},
        '',
      );
      console.log(username + ' ' + password);
      switch (resp.status) {
        case HttpStatus.OK:
          global.token = await resp.text();
          console.log(global.token);
          setLoggedIn(true);
          await AsyncStorage.setItem('username', username);
          await AsyncStorage.setItem('password', password);
          return;
          break;
        case HttpStatus.INTERNAL_SERVER_ERROR:
          setHelperText('Internal server error');
          break;
        default:
          setHelperText('No account found with the password specified');
          break;
      }
    } catch (error) {
      console.log(error);
      setHelperText(error.toString());
    }
    setLoggedIn(false);
  }

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
        visible={helperText === ''}>
        {helperText}
      </HelperText>
      <Button
        mode={'outlined'}
        onPress={async () => {
          await login();
        }}>
        Log In
      </Button>
      <Banner
        style={{marginTop: 100 / PixelRatio.get()}}
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
    </View>
  );
};

export default LogInView;
