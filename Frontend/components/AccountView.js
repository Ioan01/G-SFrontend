import React, {Component, useState} from 'react';
import {Image, Modal, Text, View} from 'react-native';
import {
  Appbar,
  Avatar,
  Banner,
  Button,
  Card,
  Divider,
  Paragraph,
  Portal,
  Provider,
  TextInput,
  Title,
} from 'react-native-paper';
import App from '../App';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import text from 'react-native-paper/src/components/Typography/Text';

const style = require('../styles');

const AccountView = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const LogIn = ({navigation}) => {
    const [passwordHidden, hidePassword] = useState(true);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [response, setResponse] = useState('');

    async function login({username, password}) {
      try {
        const resp = await fetch('http://164.92.150.184:8080/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });
        if (!resp.ok) {
          setResponse('BAD BAD BAD');
        } else {
          global.token = await resp.text();
          setResponse(global.token);
        }
      } catch (error) {
        console.log(error);
        setResponse(error.toString());
      }
    }

    return (
      <View style={{marginHorizontal: 30, marginTop: 30}}>
        <Title style={{alignSelf: 'center', marginBottom: 100}}>
          Log in with your account
        </Title>
        <TextInput
          mode={'outlined'}
          secureTextEntry={passwordHidden}
          style={{marginBottom: 30}}
          onChangeText={text => setUsername(text)}
          placeholder={'Enter username'}
        />

        <TextInput
          mode={'outlined'}
          secureTextEntry={passwordHidden}
          placeholder={'Enter password'}
          style={{marginBottom: 30}}
          onChangeText={text => setPassword(text)}
          right={
            <TextInput.Icon
              name="eye"
              onPress={() => hidePassword(!passwordHidden)}
              style={{marginHorizontal: 40}}
            />
          }
        />
        <Button
          mode={'outlined'}
          onPress={async () => {
            await login({username, password});
          }}>
          Log In
        </Button>
        <Text style={{color: 'black'}}>{response}</Text>
        <Banner
          style={{marginTop: 200}}
          visible={true}
          actions={[
            {
              label: 'Register a new account',
              onPress: () => {},
            },
          ]}>
          <Text style={{fontSize: 30}}>Don't have an account?</Text>
        </Banner>
      </View>
    );
  };

  const CreateAccount = () => {
    return (
      <View>
        <Button title={'log2'} />
      </View>
    );
  };

  const LoggedOutView = () => {
    const navigator = createStackNavigator();
    return (
      <NavigationContainer independent={true}>
        <navigator.Navigator>
          <navigator.Screen name="Log In" component={LogIn} />
          <navigator.Screen name="Create Account" component={CreateAccount} />
        </navigator.Navigator>
      </NavigationContainer>
    );
  };

  const LoggedInView = () => {
    return (
      <View>
        <Button title={'bb'} />
      </View>
    );
  };

  const currentScreen = () => {
    if (loggedIn) {
      return <LoggedInView />;
    }
    return <LoggedOutView />;
  };

  return <>{currentScreen()}</>;
};

export default AccountView;
